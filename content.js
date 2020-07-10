function copyPrDescription() {
  console.log("squashed-merge-message: Triggered copyPrDescription");
  const prTitleEl = document.getElementById("issue_title");
  if (!prTitleEl) {
    console.warn("squashed-merge-message: Failed to find PR title!");
    return;
  }

  const prNumberEl = document.querySelector(".gh-header-title .gh-header-number");
  if (!prNumberEl) {
    console.warn("squashed-merge-message: Failed to find PR Number");
    return;
  }

  const prBodyEl = document.querySelector('.comment-form-textarea[name="pull_request[body]"]');
  if (!prBodyEl) {
    console.warn("squashed-merge-message: Failed to find PR Body");
    return;
  }

  const titleField = document.getElementById('merge_title_field');
  if (!titleField) {
    console.warn("squashed-merge-message: Failed to find merge commit title");
    return;
  }

  const messageField = document.getElementById('merge_message_field');
  if (!messageField) {
    console.warn("squashed-merge-message: Failed to find merge commit message");
    return;
  }

  const commitTitle = `${prTitleEl.value} (${prNumberEl.textContent})`;
  const commitBody = prBodyEl.textContent;

  titleField.value = commitTitle;
  messageField.value = commitBody;
}

function addMergeListeners() {
  console.log("squashed-merge-message: adding listener");
  const squashButton = document.querySelector('.merge-message .btn-group-squash');
  const mergeButton = document.querySelector('.merge-message .btn-group-merge');

  if (squashButton) {
    squashButton.addEventListener('click', copyPrDescription);
  } else {
    console.warn("squashed-merge-message: Couldn't find squash button");
  }
  if (mergeButton) {
    mergeButton.addEventListener('click', copyPrDescription);
  } else {
    console.warn("squashed-merge-message: couldn't find merge button");
  }
}

document.addEventListener('pjax:end', addMergeListeners);
addMergeListeners();
