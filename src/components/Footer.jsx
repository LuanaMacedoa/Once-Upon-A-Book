
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPaperPlane } from '@fortawesome/free-solid-svg-icons';


export default function Footer() {
  return (
    <footer className="bg-[#7d6c5e] text-[#f7f6f4] py-12 w-full mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="flex items-center gap-2 mb-4 text-[#ede3e5] text-xl font-semibold">
              <FontAwesomeIcon icon={faBook} className="text-[#cc9fa4]" />
              Once Upon a Book
            </h3>
            <p className="mb-4 opacity-90">Sua livraria online de confiança. Conectando leitores aos melhores livros desde 2019</p>
          </div>
          <div>
            <h4 className="mb-4 text-[#ede3e5] font-semibold">Categorias</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-[#cc9fa4] transition-colors duration-300">Romance</a></li>
              <li><a href="#" className="text-white hover:text-[#cc9fa4] transition-colors duration-300">Fantasia</a></li>
              <li><a href="#" className="text-white hover:text-[#cc9fa4] transition-colors duration-300">Mistério</a></li>
              <li><a href="#" className="text-white hover:text-[#cc9fa4] transition-colors duration-300">Biografia</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[#ede3e5] font-semibold">Atendimento</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white hover:text-[#cc9fa4] transition-colors duration-300">Central de Ajuda</a></li>
              <li><a href="#" className="text-white hover:text-[#cc9fa4] transition-colors duration-300">Política de Privacidade</a></li>
              <li><a href="#" className="text-white hover:text-[#cc9fa4] transition-colors duration-300">Termos de Uso</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-[#ede3e5] font-semibold">Newsletter</h4>
            <p className="mb-4 opacity-90">Receba novidades e ofertas especiais</p>
            <div className="flex gap-2 mb-4">
              <input type="email" placeholder="Seu e-mail" className="flex-1 px-4 py-3 rounded-full bg-[#756650] text-white placeholder-gray-300 border-none focus:outline-none focus:ring-2 focus:ring-[#cc9fa4]" />
              <button type="submit" className="bg-[#cc9fa4] text-white px-4 py-3 rounded-full hover:bg-[#a67a80] transition-colors duration-300">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-[#756650] opacity-80">
          <p>&copy; 2025 Once Upon a Book. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
