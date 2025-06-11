document.addEventListener('DOMContentLoaded', function() {
    if (window.booksManager) {
        
        const finalizeButton = document.getElementById('finalizePurchaseButton');
        if (finalizeButton) {
            
            finalizeButton.addEventListener('click', function() {
                window.booksManager.finalizePurchase();
            });
        } else {
            console.error("Botão Finalizar Compra não encontrado!");
        }
    } else {
        console.error("BooksManager não encontrado!");
    }
});
