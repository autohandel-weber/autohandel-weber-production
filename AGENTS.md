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

- Display site photos through ReliableImage with intrinsic dimensions and bounded retries, so lazy loading reserves space and temporary delivery failures recover.
- Own site photos (logo, gallery, buttons) are bundled from src/assets/images as optimized WebP rather than CDN pointers, because the CDN path failed in the live preview; they ship with the page itself.
- Scroll reveals target individual content items, never tall containers, and use intersection entry rather than a visible-area percentage to avoid permanently hidden content.
- Both enquiry forms share client/server Zod validation and a dedicated server function; private submissions and photo uploads use server-only writes after same-origin checks, with no visitor read access.
- Email sending must remain disabled until the requested connector is linked and a verified sender is available; stored submissions must never be described as emailed.
