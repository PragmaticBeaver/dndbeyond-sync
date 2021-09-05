export function injectPreferencesPane(doc) {
  // disable dice rolling
  const preferencesPane = doc.getElementsByClassName("ct-preferences-pane")[0];
  const fields = preferencesPane.getElementsByClassName(
    "ct-preferences-pane__field ct-preferences-pane__field--toggle"
  );
  const field = Array.from(fields).find((f) => {
    const heading = f.getElementsByClassName(
      "ct-sidebar__subheading ct-preferences-pane__field-heading"
    )[0].innerText;
    if (heading.toLowerCase() === "dice rolling") {
      return f;
    }
  });
  const toggleContainer = field.getElementsByClassName(
    "ct-preferences-pane__field-input"
  )[0];
  const toggle = field.getElementsByClassName(
    "ddbc-toggle-field  ddbc-toggle-field--is-enabled ddbc-toggle-field--is-interactive"
  )[0];
  if (toggle) {
    toggle.click();
  }

  // hide toggle
  toggleContainer.style = "display: none;";

  // set custom text
  const desc = field.getElementsByClassName(
    "ct-preferences-pane__field-description"
  )[0];
  desc.innerText = "Disabled by browser extension 'D&D Beyond Sync'.";
}
