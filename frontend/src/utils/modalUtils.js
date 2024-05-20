export function showMessageDialog(title, content) {
    document.getElementById('message_modal').showModal();
    document.getElementById('message_modal_title').innerText = title;
    document.getElementById('message_modal_content').innerText = content
}