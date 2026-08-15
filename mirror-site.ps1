$ErrorActionPreference = "Stop"

$BaseUrl = "https://hpstechnologies.my"
$Pages = @(
  "",
  "engineering-solutions",
  "cfd-and-simulation-engineers",
  "embedded-electrical-and-software-engineering-services",
  "mechanical-engineering-services",
  "engineering-services",
  "industry-solutions-engineering-solutions",
  "engineering-randd-services"
)

$downloaded = @{}

function Ensure-Parent($Path) {
  $parent = Split-Path -Parent $Path
  if ($parent) {
    New-Item -ItemType Directory -Force -Path $parent | Out-Null
  }
}

function Get-PagePath($Slug) {
  if ([string]::IsNullOrWhiteSpace($Slug)) {
    return "index.html"
  }

  return (Join-Path $Slug "index.html")
}

function Get-RelativePath($FromDir, $ToPath) {
  $fromFull = [IO.Path]::GetFullPath($FromDir)
  $toFull = [IO.Path]::GetFullPath($ToPath)
  if (-not $fromFull.EndsWith([IO.Path]::DirectorySeparatorChar)) {
    $fromFull += [IO.Path]::DirectorySeparatorChar
  }

  $fromUri = [Uri]$fromFull
  $toUri = [Uri]$toFull
  return [Uri]::UnescapeDataString($fromUri.MakeRelativeUri($toUri).ToString())
}

function Get-ResourcePath($Url) {
  $uri = [Uri]$Url

  if ($uri.Host -eq "hpstechnologies.my") {
    $path = $uri.AbsolutePath.TrimStart("/")
    if ([string]::IsNullOrWhiteSpace($path)) {
      return "index.html"
    }

    if (-not [IO.Path]::GetExtension($path)) {
      return (Join-Path $path "index.html")
    }

    return $path
  }

  $name = [IO.Path]::GetFileName($uri.AbsolutePath)
  if ([string]::IsNullOrWhiteSpace($name)) {
    $name = "resource"
  }

  $safeName = ($name -replace '[^A-Za-z0-9._-]', '-')
  $queryKey = ""
  if (-not [string]::IsNullOrWhiteSpace($uri.Query)) {
    $bytes = [Text.Encoding]::UTF8.GetBytes($uri.Query)
    $sha = [Security.Cryptography.SHA1]::Create()
    $hash = [BitConverter]::ToString($sha.ComputeHash($bytes)).Replace("-", "").Substring(0, 8).ToLowerInvariant()
    $ext = [IO.Path]::GetExtension($safeName)
    $stem = [IO.Path]::GetFileNameWithoutExtension($safeName)
    if ($ext) {
      $safeName = "$stem-$hash$ext"
    } else {
      $safeName = "$safeName-$hash"
    }
  }

  return (Join-Path "assets\mirrored\$($uri.Host)" $safeName)
}

function Download-Url($Url, $OutPath) {
  if ($downloaded.ContainsKey($OutPath)) {
    return
  }

  Ensure-Parent $OutPath
  Invoke-WebRequest -Uri $Url -OutFile $OutPath -UseBasicParsing -TimeoutSec 120
  $downloaded[$OutPath] = $true
}

function Get-AbsoluteUrl($Url, $CurrentUrl) {
  if ($Url -match '^(data:|mailto:|tel:|#|javascript:)') {
    return $null
  }

  try {
    return ([Uri]::new([Uri]$CurrentUrl, $Url)).AbsoluteUri
  } catch {
    return $null
  }
}

function Rewrite-And-Download($Content, $CurrentUrl, $CurrentLocalPath) {
  $matches = [regex]::Matches($Content, '(?<attr>(?:href|src|poster|component-url|renderer-url|before-hydration-url)=["''])(?<url>[^"'']+)(?<end>["''])|url\((?<quote>["'']?)(?<cssurl>[^)"'']+)(?<quote2>["'']?)\)')

  foreach ($match in $matches) {
    $rawUrl = if ($match.Groups["url"].Success) { $match.Groups["url"].Value } else { $match.Groups["cssurl"].Value }
    if ($rawUrl -match '^(assets/|\.\./assets/|_astro|\.\./_astro|engineering-|cfd-|embedded-|mechanical-)') {
      continue
    }

    if ($rawUrl -notmatch '^(https?:)?//' -and $rawUrl -notmatch '^/') {
      continue
    }

    $absolute = Get-AbsoluteUrl $rawUrl $CurrentUrl
    if (-not $absolute) {
      continue
    }

    $uri = [Uri]$absolute
    $shouldMirror = (
      $uri.Host -eq "hpstechnologies.my" -or
      $uri.Host -eq "assets.zyrosite.com" -or
      $uri.Host -eq "videos.pexels.com" -or
      $uri.Host -eq "images.pexels.com" -or
      $uri.Host -eq "cdn.zyrosite.com"
    )

    if (-not $shouldMirror) {
      continue
    }

    $localPath = Get-ResourcePath $absolute
    $isDownloadable = $localPath -match '\.(html|css|js|png|jpg|jpeg|webp|svg|ico|txt|mp4|woff2?|ttf)$'
    if (-not $isDownloadable) {
      continue
    }

    if ($localPath -notmatch '\.html$') {
      Download-Url $absolute $localPath
    }

    $fromDir = Split-Path -Parent $CurrentLocalPath
    if ([string]::IsNullOrWhiteSpace($fromDir)) {
      $fromDir = "."
    }

    $relative = Get-RelativePath $fromDir $localPath
    $relative = $relative -replace '\\', '/'
    $Content = $Content.Replace($rawUrl, $relative)
  }

  return $Content
}

foreach ($slug in $Pages) {
  $url = if ([string]::IsNullOrWhiteSpace($slug)) { "$BaseUrl/" } else { "$BaseUrl/$slug" }
  $localPath = Get-PagePath $slug
  Ensure-Parent $localPath
  $html = (Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 120).Content
  $html = Rewrite-And-Download $html $url $localPath
  Set-Content -Path $localPath -Value $html -Encoding UTF8
}

$changed = $true
while ($changed) {
  $changed = $false
  $files = Get-ChildItem -Recurse -File -Include *.html,*.css,*.js
  foreach ($file in $files) {
    $before = Get-Content -Path $file.FullName -Raw
    $currentUrl = "$BaseUrl/"
    $after = Rewrite-And-Download $before $currentUrl $file.FullName
    if ($after -ne $before) {
      Set-Content -Path $file.FullName -Value $after -Encoding UTF8
      $changed = $true
    }
  }
}

Write-Host "Mirrored pages: $($Pages.Count)"
Write-Host "Downloaded resources: $($downloaded.Count)"
