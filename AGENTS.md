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
- Scroll reveals target individual content items, never tall containers, and use intersection entry rather than a visible-area percentage to avoid permanently hidden content.
