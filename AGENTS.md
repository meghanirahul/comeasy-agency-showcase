<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Keep TanStack Start and TanStack Router for server-rendered React; the platform bootstrap depends on them and React Router cannot replace them.
- Shared agency navigation, footer and presentation blocks live in `src/components/agency.tsx`, with separate file-based content routes for independently shareable pages.
- Store imported portfolio content in a browser-safe data module and binary uploads as Lovable Asset pointers to keep SSR deterministic and the repository lightweight.
- Contact enquiries post directly to FormSubmit (free, no key) addressed to the agency email; the first submission triggers a one-time activation email that must be confirmed.
