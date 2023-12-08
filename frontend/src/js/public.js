const scrollToBottom = function (id) {
    const idSelector = '#'+id
    const domWrapper = document.querySelector(idSelector);
    (function smoothScroll() {
        domWrapper.scrollTop = domWrapper.scrollHeight - domWrapper.offsetHeight > 0 ? domWrapper.scrollHeight - domWrapper.offsetHeight : 0
    })()
}

export { scrollToBottom }
