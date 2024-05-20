export function showStoryMainDialog(title, content) {
    document.getElementById('pd_story_model').showModal();
    document.getElementById('pd_story_modal_title').innerText = title;
    document.getElementById('pd_story_message').innerText = content
}