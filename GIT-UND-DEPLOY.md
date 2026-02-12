# Git & Deploy – hai-workshop

**Wichtig für Cursor/Agent:** Das Git-Repository liegt **nur im Ordner `hai-workshop`**, nicht im übergeordneten Projekt „20_HAI 2026“.

## Repo & Remote

- **Pfad:** `hai-workshop/` (also: in diesen Ordner wechseln für alle git-Befehle)
- **Remote:** `https://github.com/BaraInno/hai-workshop-2026.git`
- **Branch:** `main`

## Typischer Ablauf nach Änderungen

```bash
cd hai-workshop
git status
git add .
git commit -m "Kurze Beschreibung der Änderung"
git push origin main
```

## Wenn die Userin fragt „ist alles gespeichert?“ / „gepusht?“

1. **Gespeichert:** Änderungen in Cursor sind in den Dateien gespeichert.
2. **Gepusht:** Immer **aus dem Ordner `hai-workshop`** ausführen:
   - `git status` → sehen, ob es uncommittete Änderungen gibt
   - `git add .` + `git commit -m "…"` + `git push origin main`

Im Workspace-Root („20_HAI 2026“) gibt es **kein** `.git` – nur in `hai-workshop/`.
