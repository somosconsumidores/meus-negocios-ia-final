
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { Star, ChevronRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Modal from '@/components/Modal.jsx';

// Services Content Data
const servicesData = {
  site: {
    title: 'Site e Landing Page',
    content: `Seu negócio precisa de uma casa na internet. Um site é como uma loja física, mas aberta 24/7 para o mundo todo.

Aqui está o que você ganha:
• Uma página profissional que representa sua marca
• Otimização para aparecer no Google (SEO) — quando alguém procura "instalador de papel de parede em São Paulo", seu site aparece
• Design responsivo — funciona perfeitamente no celular, tablet e computador
• Formulário de contato ou agendamento integrado — clientes entram em contato direto com você
• Velocidade otimizada — site rápido não perde cliente

Quanto tempo leva? De 2 a 4 semanas, dependendo da complexidade.
Quanto custa? Varia de acordo com o escopo, mas começamos com pacotes acessíveis para pequenos negócios.`
  },
  n8n: {
    title: 'Automações com N8N',
    content: `Automação é fazer máquinas trabalharem para você enquanto você dorme.

Exemplos práticos:
• Alguém envia uma mensagem no WhatsApp → o sistema responde automaticamente com informações sobre seus serviços
• Cliente preenche um formulário → automaticamente você recebe um agendamento no seu calendário
• Novo cliente → sistema envia um email de boas-vindas com instruções
• Follow-up automático → 3 dias após o contato, o sistema envia uma mensagem lembrando o cliente

Por que isso importa?
Você não perde cliente por não responder rápido. O sistema trabalha 24/7, mesmo quando você está dormindo ou atendendo outro cliente.

Casos de uso comuns:
- Barbearia: agendamento automático via WhatsApp
- Instalador: confirmação automática de serviço
- Confeiteira: pedido automático com data de entrega
- Técnico de AC: lembretes de manutenção preventiva

Resultado: Mais clientes convertidos, menos tempo perdido em tarefas repetitivas.`
  },
  ads: {
    title: 'Tráfego Pago (Meta & Google Ads)',
    content: `Tráfego pago significa colocar anúncios na frente de pessoas que estão procurando exatamente o que você oferece.

Como funciona:
• Google Ads: Quando alguém digita "encanador em Curitiba", seu anúncio aparece no topo dos resultados
• Meta Ads (Instagram/Facebook): Seus anúncios aparecem no feed de pessoas que moram perto de você e têm interesse em seus serviços

Por que é diferente de OLX/GetNinjas?
Na OLX, você compete por preço com centenas de outros prestadores. Aqui, você aparece para quem está procurando, e você controla quanto gasta.

Modelo de pagamento:
Você só paga quando alguém clica no seu anúncio (CPC) ou quando alguém vê seu anúncio (CPM). Sem surpresas.

Exemplo real:
Um barbeiro investe R$ 500/mês em anúncios no Instagram. Cada cliente novo custa R$ 25 em anúncio. Se ele ganha R$ 100 por cliente, o lucro é R$ 75 por cliente novo.

Resultado: Clientes previsíveis, sem depender de marketplace.`
  },
  grants: {
    title: 'Google Ad Grants para ONGs',
    content: `Se você é uma ONG, o Google oferece até U$10.000/mês em anúncios GRATUITOS.

O que é Google Ad Grants?
É um programa do Google que doa créditos de anúncio para organizações sem fins lucrativos. Você não paga nada — o Google paga pelos seus anúncios.

Quem pode participar?
• ONGs registradas como organização sem fins lucrativos
• Instituições de caridade
• Organizações de educação
• Grupos comunitários

Como funciona?
1. Você se inscreve no programa (a gente ajuda com toda a documentação)
2. Google aprova sua ONG
3. Você recebe U$10.000/mês em créditos de anúncio
4. Você usa esses créditos para promover sua causa

Exemplos de uso:
• ONG de educação: anúncios para atrair voluntários
• Abrigo de animais: anúncios para adoção
• Organização ambiental: anúncios para campanhas de conscientização

Por que isso importa?
Você multiplica o impacto da sua ONG sem gastar um centavo em publicidade. Mais pessoas conhecem sua causa, mais doações, mais voluntários.

Resultado: Máximo impacto com zero custo em anúncios.`
  },
  social: {
    title: 'Gestão de Social Media',
    content: `Social media é onde seus clientes estão. Instagram e Facebook são vitrines digitais do seu negócio.

O que fazemos:
• Criamos conteúdo semanal (posts, stories, reels) alinhado com o que você vende
• Respondemos comentários e mensagens (ou automatizamos isso)
• Analisamos o que funciona e otimizamos
• Crescemos sua audiência organicamente

Por que é importante?
Um barbeiro com 5.000 seguidores no Instagram tem uma base de clientes potenciais. Cada post é uma oportunidade de vender.

Exemplos de conteúdo:
• Antes e depois de trabalhos
• Dicas de cuidado (como manter o corte)
• Promoções e ofertas
• Stories do dia a dia (humaniza sua marca)
• Reels virais (alcance orgânico)

Frequência:
Mínimo 3-4 posts por semana para manter o algoritmo feliz.

Resultado: Mais seguidores, mais engajamento, mais vendas diretas pelo Instagram.`
  },
  saas: {
    title: 'Criação de SaaS',
    content: `SaaS significa "Software como Serviço" — é um produto digital que você vende por assinatura.

Exemplos de SaaS:
• Um app para agendamento de serviços (barbeiros, salões, consultórios)
• Um sistema de gestão de clientes para prestadores de serviço
• Uma plataforma de cursos online
• Um app de controle financeiro para pequenos negócios

Por que criar um SaaS?
Você cria uma vez, vende infinitas vezes. Diferente de um serviço (onde você troca tempo por dinheiro), um SaaS gera receita passiva.

Exemplo:
Um desenvolvedor cria um app de agendamento. Cobra R$ 99/mês de cada barbeiro que usa. Com 100 barbeiros, ele ganha R$ 9.900/mês sem fazer nada extra.

Como funciona o processo?
1. Você tem uma ideia de produto
2. A gente valida se é viável
3. Desenvolvemos o MVP (versão mínima funcional)
4. Você testa com clientes reais
5. Iteramos e melhoramos
6. Você lança e começa a vender

Tecnologia:
Usamos tecnologia moderna, escalável e segura. Seu SaaS cresce com você.

Resultado: Receita passiva, escalabilidade infinita, negócio que não depende só de você.`
  },
  marketing: {
    title: 'Planejamento de Marketing',
    content: `Antes de gastar um real em anúncio, você precisa de um mapa. Um plano de marketing é exatamente isso.

O que é um plano de marketing?
É um documento que define:
• Quem é seu cliente ideal (persona)
• Onde ele está (online ou offline)
• Como você vai alcançá-lo
• Quanto você vai gastar
• Qual é o resultado esperado

Por que é importante?
Muitos negócios gastam dinheiro em anúncio sem saber se está funcionando. Um plano evita desperdício.

O que incluímos no plano:
• Análise do seu negócio e concorrência
• Definição de metas claras (ex: 10 novos clientes/mês)
• Estratégia de canais (Google Ads, Instagram, WhatsApp, etc.)
• Calendário de ações para os próximos 90 dias
• Orçamento recomendado por canal
• KPIs (indicadores) para medir sucesso

Exemplo prático:
Um instalador de papel de parede quer 10 novos clientes/mês. O plano define:
- 40% do orçamento em Google Ads (pessoas procurando instalador)
- 30% em Instagram Ads (pessoas que gostam de decoração)
- 20% em automação de WhatsApp (converter visitantes em clientes)
- 10% em gestão de social media (construir autoridade)

Resultado: Você sabe exatamente onde gastar, quanto gastar e qual resultado esperar. Sem surpresas, sem desperdício.`
  }
};

const HomePage = () => {
  const [selectedServiceKey, setSelectedServiceKey] = useState(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to render modal content with proper paragraph spacing
  const renderModalContent = (text) => {
    if (!text) return null;
    return text.split('\n\n').map((paragraph, idx) => (
      <p key={idx} className="mb-4 whitespace-pre-wrap">
        {paragraph}
      </p>
    ));
  };

  return (
    <>
      <Helmet>
        <title>Mais Negócios.IA - Ajudamos você a crescer o seu negócio</title>
        <meta name="description" content="Criamos sua presença digital do zero — site, automações, tráfego pago e muito mais. Você foca no que sabe fazer. A gente cuida do resto." />
      </Helmet>

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1698221818995-8c317b7a173b" alt="Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Ajudamos você a crescer o seu negócio.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto"
          >
            Criamos sua presença digital do zero — site, automações, tráfego pago e muito mais. Você foca no que sabe fazer. A gente cuida do resto.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="https://wa.me/552139552298" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] w-full sm:w-auto">
              Quero mais clientes
            </a>
            <button onClick={() => scrollToSection('servicos')} className="text-white font-semibold text-lg hover:text-primary transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
              Ver os serviços <ChevronRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Para Quem É Section */}
      <section id="para-quem-e" className="py-20 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
              Você trabalha muito. Mas ainda depende de plataformas que te cobram caro por cada cliente.
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground text-center mb-16 max-w-4xl mx-auto">
              Se você presta serviços e quer parar de competir por preço na OLX ou no GetNinjas, chegou a hora de ter sua própria presença digital.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInSection delay={0.3}>
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="text-5xl mb-4">🔧</div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Você é bom no que faz</h3>
                <p className="text-muted-foreground">
                  Você domina o seu ofício. Seja instalação, conserto, beleza ou qualquer serviço — você entrega qualidade.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="text-5xl mb-4">📱</div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Mas a internet não trabalha por você</h3>
                <p className="text-muted-foreground">
                  Você depende de plataformas que cobram comissão, te colocam em leilão de preço e controlam seus clientes.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.5}>
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">A gente muda isso</h3>
                <p className="text-muted-foreground">
                  Criamos sua presença digital completa. Site próprio, automações, tráfego pago. Você recebe clientes direto, sem intermediário.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Serviços Section */}
      <section id="servicos" className="py-20 md:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
              O que fazemos por você
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
              Soluções digitais completas para quem quer crescer de verdade.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Card - Spans 2 columns on desktop */}
            <FadeInSection delay={0.3}>
              <div className="md:col-span-2 bg-card rounded-[18px] p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold mb-4 self-start">
                  Mais popular
                </div>
                <div className="text-4xl mb-4">🌐</div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-card-foreground">Site e Landing Page</h3>
                <p className="text-muted-foreground mb-6 text-lg flex-grow">
                  Site profissional responsivo, otimizado para conversão. Seu cliente te encontra no Google, vê seu trabalho e entra em contato direto com você.
                </p>
                <button 
                  onClick={() => setSelectedServiceKey('site')}
                  className="text-primary font-semibold hover:underline flex items-center gap-1 mt-auto self-start"
                >
                  Saiba mais <ChevronRight size={18} />
                </button>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <div className="bg-card rounded-[18px] p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Automações com N8N</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Automatize WhatsApp, agendamentos, follow-ups. Nunca mais perca cliente por demora na resposta.
                </p>
                <button 
                  onClick={() => setSelectedServiceKey('n8n')}
                  className="text-primary font-semibold hover:underline flex items-center gap-1 mt-auto self-start"
                >
                  Saiba mais <ChevronRight size={18} />
                </button>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.5}>
              <div className="bg-card rounded-[18px] p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="text-4xl mb-4">📣</div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Tráfego Pago (Meta & Google Ads)</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Anúncios direcionados para quem realmente precisa do seu serviço. Investimento que se paga.
                </p>
                <button 
                  onClick={() => setSelectedServiceKey('ads')}
                  className="text-primary font-semibold hover:underline flex items-center gap-1 mt-auto self-start"
                >
                  Saiba mais <ChevronRight size={18} />
                </button>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.6}>
              <div className="bg-card rounded-[18px] p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Google Ad Grants para ONGs</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Até R$ 50 mil/mês em créditos gratuitos do Google Ads para organizações sem fins lucrativos.
                </p>
                <button 
                  onClick={() => setSelectedServiceKey('grants')}
                  className="text-primary font-semibold hover:underline flex items-center gap-1 mt-auto self-start"
                >
                  Saiba mais <ChevronRight size={18} />
                </button>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.7}>
              <div className="bg-card rounded-[18px] p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="text-4xl mb-4">📲</div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Gestão de Social Media</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Conteúdo semanal planejado para Instagram e Facebook. Mostre seu trabalho e atraia clientes.
                </p>
                <button 
                  onClick={() => setSelectedServiceKey('social')}
                  className="text-primary font-semibold hover:underline flex items-center gap-1 mt-auto self-start"
                >
                  Saiba mais <ChevronRight size={18} />
                </button>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.8}>
              <div className="bg-card rounded-[18px] p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Criação de SaaS</h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Transformamos sua ideia em software. Sistemas personalizados para escalar seu negócio.
                </p>
                <button 
                  onClick={() => setSelectedServiceKey('saas')}
                  className="text-primary font-semibold hover:underline flex items-center gap-1 mt-auto self-start"
                >
                  Saiba mais <ChevronRight size={18} />
                </button>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.9}>
              <div className="md:col-span-2 bg-card rounded-[18px] p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full">
                <div className="text-4xl mb-4">🗺️</div>
                <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-card-foreground">Planejamento de Marketing</h3>
                <p className="text-muted-foreground mb-6 text-lg flex-grow">
                  Estratégia completa de 90 dias. Definimos metas, canais, mensagens e ações para você crescer de forma consistente.
                </p>
                <button 
                  onClick={() => setSelectedServiceKey('marketing')}
                  className="text-primary font-semibold hover:underline flex items-center gap-1 mt-auto self-start"
                >
                  Saiba mais <ChevronRight size={18} />
                </button>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Como Funciona Section */}
      <section id="como-funciona" className="py-20 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
              Simples assim.
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
              Sem burocracia. Sem contrato eterno. Sem surpresa.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <FadeInSection delay={0.3}>
              <div className="text-center md:text-left">
                <CounterNumber target={1} className="text-6xl md:text-7xl font-bold text-primary/20 mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Me conta o que você precisa</h3>
                <p className="text-muted-foreground">
                  Uma conversa rápida no WhatsApp. Você explica seu negócio, a gente entende seu desafio.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <div className="text-center md:text-left">
                <CounterNumber target={2} className="text-6xl md:text-7xl font-bold text-primary/20 mb-4" />
                <h3 className="text-2xl font-semibold mb-4">A gente monta sua solução</h3>
                <p className="text-muted-foreground">
                  Proposta clara, sem enrolação. Você sabe exatamente o que vai receber e quanto vai investir.
                </p>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.5}>
              <div className="text-center md:text-left">
                <CounterNumber target={3} className="text-6xl md:text-7xl font-bold text-primary/20 mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Seu negócio começa a crescer</h3>
                <p className="text-muted-foreground">
                  Implementamos tudo, você acompanha os resultados. Mais clientes, menos dependência de plataformas.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-20 md:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
              Quem já deu o próximo passo
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:overflow-visible overflow-x-auto md:grid snap-x snap-mandatory md:snap-none">
            <FadeInSection delay={0.3}>
              <div className="bg-card rounded-[18px] p-8 shadow-md min-w-[280px] snap-start">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    MR
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Marcos R.</div>
                    <div className="text-sm text-muted-foreground">Instalador de Papel de Parede, São Paulo</div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Em 3 meses de site e tráfego pago, parei de usar o GetNinjas. Hoje recebo pedidos direto pelo WhatsApp. Meu faturamento dobrou.
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <div className="bg-card rounded-[18px] p-8 shadow-md min-w-[280px] snap-start">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold">
                    JL
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Juliana L.</div>
                    <div className="text-sm text-muted-foreground">Confeiteira, Belo Horizonte</div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Nunca pensei que fosse ter site próprio. Achei que era só pra empresa grande. O processo foi simples e hoje vendo pelo Instagram com muito mais margem.
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.5}>
              <div className="bg-card rounded-[18px] p-8 shadow-md min-w-[280px] snap-start">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-bold">
                    PS
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">Pedro S.</div>
                    <div className="text-sm text-muted-foreground">Barbeiro, Curitiba</div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  As automações no WhatsApp salvaram minha vida. Antes eu perdia cliente por não responder rápido. Agora o sistema agenda sozinho.
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section id="contato" className="py-20 md:py-24 bg-gradient-to-br from-foreground via-foreground to-foreground/90 text-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInSection>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ letterSpacing: '-0.02em' }}>
              Pronto para sair da OLX e Getninjas?
            </h2>
          </FadeInSection>
          <FadeInSection delay={0.2}>
            <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90">
              Fale com a gente agora pelo WhatsApp. Uma conversa rápida de 15 minutos pode mudar o rumo do seu negócio.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/552139552298" target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-all active:scale-[0.98] w-full sm:w-auto">
                Falar no WhatsApp
              </a>
              <button onClick={() => scrollToSection('servicos')} className="text-background font-semibold text-lg hover:text-primary transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                Ver todos os serviços <ChevronRight size={20} />
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <span className="text-2xl font-bold text-foreground">Mais Negócios.IA</span>
            </div>
            <div className="flex flex-wrap gap-6">
              <button onClick={() => scrollToSection('servicos')} className="text-muted-foreground hover:text-primary transition-colors">
                Serviços
              </button>
              <button onClick={() => scrollToSection('como-funciona')} className="text-muted-foreground hover:text-primary transition-colors">
                Como Funciona
              </button>
              <button onClick={() => scrollToSection('para-quem-e')} className="text-muted-foreground hover:text-primary transition-colors">
                Para Quem É
              </button>
              <a href="https://wa.me/552139552298" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                Contato
              </a>
            </div>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2026 Mais Negócios.IA. Todos os direitos reservados a Insight2growth.com.br.
            </p>
            <p className="text-muted-foreground text-sm">
              Feito para quem trabalha de verdade.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Termos de Serviço</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Service Details Modal */}
      <Modal
        isOpen={!!selectedServiceKey}
        onClose={() => setSelectedServiceKey(null)}
        title={selectedServiceKey ? servicesData[selectedServiceKey].title : ''}
      >
        {selectedServiceKey && renderModalContent(servicesData[selectedServiceKey].content)}
      </Modal>
    </>
  );
};

// Scroll reveal component
const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// Counter animation component
const CounterNumber = ({ target, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className={className}>
      {String(count).padStart(2, '0')}
    </div>
  );
};

export default HomePage;
