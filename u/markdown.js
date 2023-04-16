
// Function/method that returns a message if user doesn't want contributors
function renderContributingSection(confirmContributers, data) {
    if (!confirmContributers) {
      return `
    Thank you for your interest in helping out; however, I will not be accepting contributions from third parties.
      `;
    } else {
      return `
    ${data}
      `;
    }
  }
