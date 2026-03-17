const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const current = display.value;

        if(value === 'C') {
            display.value = '';
        } else if(value === '⌫') {
            display.value = current.slice(0, -1);
        } else if(value === '=') {
            try {
                display.value = eval(display.value) || '';
            } catch {
                display.value = 'Error';
            }
        } else if(value === '±') {
            if(current) {
                if(current.startsWith('-')) display.value = current.slice(1);
                else display.value = '-' + current;
            }
        } else {
            // Prevent multiple operators in a row
            const lastChar = current.slice(-1);
            if(['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(value)) {
                display.value = current.slice(0, -1) + value;
            } else {
                display.value += value;
            }
        }
    });
});

// Optional: Keyboard support
document.addEventListener('keydown', e => {
    const key = e.key;
    const allowed = '0123456789+-*/.=cC';
    if(allowed.includes(key)) {
        const btn = Array.from(buttons).find(b => b.dataset.value === key || (key === 'Enter' && b.dataset.value === '=') || (key === 'Backspace' && b.dataset.value === '⌫'));
        if(btn) btn.click();
    }
});