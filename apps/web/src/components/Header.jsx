
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[180px] sm:min-h-[200px] lg:min-h-[240px] py-4 sm:py-6 lg:py-8">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity">
            <img 
              src="https://horizons-cdn.hostinger.com/14507c7f-7987-4663-b20d-1be1e236425f/d5fe986f594fe4ec577fe5cf6c49d534.png" 
              alt="Mais Negócios.IA logo"
              className="h-36 sm:h-40 lg:h-48 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('servicos')} className={`font-medium transition-colors hover:text-primary ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              Serviços
            </button>
            <button onClick={() => scrollToSection('como-funciona')} className={`font-medium transition-colors hover:text-primary ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              Como Funciona
            </button>
            <button onClick={() => scrollToSection('para-quem-e')} className={`font-medium transition-colors hover:text-primary ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              Para Quem É
            </button>
            <button onClick={() => scrollToSection('contato')} className={`font-medium transition-colors hover:text-primary ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              Contato
            </button>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold hover:bg-primary/90 transition-all active:scale-[0.98]">
              Quero crescer agora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-4 py-6 space-y-4">
            <button onClick={() => scrollToSection('servicos')} className="block w-full text-left font-medium text-foreground hover:text-primary transition-colors">
              Serviços
            </button>
            <button onClick={() => scrollToSection('como-funciona')} className="block w-full text-left font-medium text-foreground hover:text-primary transition-colors">
              Como Funciona
            </button>
            <button onClick={() => scrollToSection('para-quem-e')} className="block w-full text-left font-medium text-foreground hover:text-primary transition-colors">
              Para Quem É
            </button>
            <button onClick={() => scrollToSection('contato')} className="block w-full text-left font-medium text-foreground hover:text-primary transition-colors">
              Contato
            </button>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="block w-full bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-center hover:bg-primary/90 transition-all active:scale-[0.98]">
              Quero crescer agora
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
