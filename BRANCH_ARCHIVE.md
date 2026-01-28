# Branch Archive

This document lists all original branches that were consolidated into the `main` branch on January 28, 2026.

## Archived Branches

| Original Branch | Backup Branch | Backup Tag | Last Commit Message |
|-----------------|---------------|------------|---------------------|
| main | backup/main | backup-main-20260128174848 | Initial commit |
| add-core-images-20260128-1437 | backup/add-core-images-20260128-1437 | backup-add-core-images-20260128-1437-20260128174848 | docs: add image integration report |
| darkmode-premium-20260128-1543 | backup/darkmode-premium-20260128-1543 | backup-darkmode-premium-20260128-1543-20260128174848 | Delete .npm_local_cache directory |
| add-core-finish-20260128-1518 | backup/add-core-finish-20260128-1518 | backup-add-core-finish-20260128-1518-20260128174848 | chore: Update Next.js development logs |
| fix/darkmode-horizontal-20260128-1559 | backup/fix-darkmode-horizontal-20260128-1559 | backup-fix-darkmode-horizontal-20260128-1559-20260128174848 | fix: darkmode and horizontal fixes |
| fix/darkmode-horizontal-20260128-1622 | backup/fix-darkmode-horizontal-20260128-1622 | backup-fix-darkmode-horizontal-20260128-1622-20260128174848 | fix(ui): true-black dark mode, continuous rotor, RBI NBFC Chatbot |
| cleanup/repo-20260128-1705 | backup/cleanup-repo-20260128-1705 | backup-cleanup-repo-20260128-1705-20260128174848 | Add new SST and meta files for Turbopack cache updates |

## Restoration Instructions

To restore any branch from backup:

```bash
# From backup branch
git checkout backup/<branch-name>
git checkout -b <restored-branch-name>

# From backup tag
git checkout backup-<branch-name>-<timestamp>
git checkout -b <restored-branch-name>
```

## Notes

- All backups were created before any merge operations
- Backup tags are immutable references to the exact state of each branch at archival time
- The consolidation used a "theirs" conflict resolution strategy, prioritizing newer branches over older ones
