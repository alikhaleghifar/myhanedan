param(
  [Parameter(Mandatory=$true)]
  [string]$m
)

# Stage all changes
git add -A

# Commit changes with the provided commit message
git commit -m $m

# Push the changes to the remote repository
git push