// Example: DOM manipulation, setting up event listeners, etc.
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('input');
    const message = input.value;
    if (message) {
        socket.emit('chat message', message);
        input.value = ''; // Clear input field
    }
});
