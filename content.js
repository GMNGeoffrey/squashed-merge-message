function copyPrDescription() {
  console.log("squashed-merge-message: Triggered copyPrDescription");
  const prTitleEl = document.getElementById("issue_title");
  if (!prTitleEl) {
    console.warn("squashed-merge-message: Failed to find PR title!");
    return;
  }

  const prNumberNl = document.querySelectorAll(".gh-header-title .gh-header-number");
  if (prNumberNl.length !== 1) {
    console.warn(`squashed-merge-message: Found ${prNumberNl.length} PR number elements`);
    return;
  }

  const prBodyNl = document.querySelectorAll('.comment-form-textarea[name="pull_request[body]"]');
  if (prBodyNl.length !== 1) {
    console.warn(`squashed-merge-message: Found ${prBodyNl.length} PR Body elements`);
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

  const commitTitle = `${prTitleEl.value} (${prNumberNl.textContent})`;
  const commitBody = prBodyNl[0].textContent;

  titleField.value = commitTitle;
  messageField.value = commitBody;
}

function addMergeListeners() {
  if (!window.location.pathname.match("/pull/[0-9]+$")) return;
  console.log("squashed-merge-message: adding listener");
  const squashButtonNl = document.querySelectorAll('.merge-message .btn-group-squash');
  const mergeButtonNl = document.querySelectorAll('.merge-message .btn-group-merge');

  if (squashButtonNl.length === 1) {
    squashButtonNl[0].addEventListener('click', copyPrDescription);
  } else {
    console.warn("squashed-merge-message: Couldn't find squash button");
  }
  if (mergeButtonNl.length === 1) {
    mergeButtonNl[0].addEventListener('click', copyPrDescription);
  } else {
    console.warn("squashed-merge-message: couldn't find merge button");
  }
}

document.addEventListener('pjax:end', addMergeListeners);
addMergeListeners();
