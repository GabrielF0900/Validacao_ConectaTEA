"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Target, TrendingUp, MessageSquare, Bot, ChevronLeft, ChevronRight, Check } from "lucide-react"

export default function ConectaTEAPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [clickedFeatures, setClickedFeatures] = useState<Record<string, number>>({
    metas: 0,
    comunicacao: 0,
    relatorios: 0,
    ia: 0,
  })
  const [clickedPricing, setClickedPricing] = useState<Record<string, number>>({
    essencial: 0,
    profissional: 0,
  })

  const slides = [
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-1TEd9riHbifLKH6pfxB4rktYTwLqgU.jpg",
      caption: "Dashboard - Acompanhe o progresso e gerencie as atividades",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-LwZsseuGCDlCUlo2R6Y5M5IgBN2XjZ.jpg",
      caption: "Gestão de Crianças - Gerencie as crianças cadastradas no sistema",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-RJ2JUTiRcqWpj5rWSLa3M0EiTcwEiO.jpg",
      caption: "Recursos que Fazem a Diferença",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-VbQmRk8YhIvMImDN1WpftVdBkoZcUo.jpg",
      caption: "Funcionalidades Principais do Sistema",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-GOeYq8MnUTgy3pTaUbBHt7Ne6mLHqf.jpg",
      caption: "Pronto para Transformar Vidas?",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-WHKzsaY0v0MvENy3m1bMuVHVOP6D5x.jpg",
      caption: "Tela de Cadastro - Crie sua conta",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-Uy6KGotM8DBktDRAQuGcg605QKXS9m.jpg",
      caption: "Crianças Recentes e Metas em Andamento",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-5VFNynbJRWknvOfenz4EZfeDsFsm0w.jpg",
      caption: "Progresso - Visualize a evolução das crianças e metas",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-2lvc658InCQkhmHn8RQ368XupVPTUy.jpg",
      caption: "Gráficos de Progresso - Análise detalhada por criança e categoria",
    },
    {
      url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-OcUTaPbmlAP0sGfE8sNAmPPylHJsS9.jpg",
      caption: "Atualizações Recentes - Acompanhe as últimas evoluções",
    },
  ]

  const handleFeatureClick = (feature: string) => {
    setClickedFeatures((prev) => ({
      ...prev,
      [feature]: prev[feature] + 1,
    }))
    console.log(`[v0] Feature clicked: ${feature}, total clicks: ${clickedFeatures[feature] + 1}`)
  }

  const handlePricingClick = (plan: string) => {
    setClickedPricing((prev) => ({
      ...prev,
      [plan]: prev[plan] + 1,
    }))
    console.log(`[v0] Pricing plan clicked: ${plan}, total clicks: ${clickedPricing[plan] + 1}`)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const scrollToForm = () => {
    const formSection = document.getElementById("registration-form")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00D084] text-white font-bold text-lg">
              C
            </div>
            <span className="text-xl font-semibold">ConectaTEA</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00D084] to-[#00B872] py-20 md:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance">
              Acompanhe o progresso das crianças com TEA de forma simples e colaborativa
            </h1>
            <p className="mt-6 text-lg text-white/90 sm:text-xl text-pretty max-w-3xl mx-auto leading-relaxed">
              Famílias e profissionais conectados em um só lugar, com ferramentas que tornam o acompanhamento mais
              humano e eficaz.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="text-lg px-8 gap-2 bg-white text-[#00D084] hover:bg-white/90"
                onClick={scrollToForm}
              >
                Quero participar da pesquisa <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">Sobre o ConectaTEA</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Uma plataforma completa para acompanhar o desenvolvimento e conectar famílias e profissionais no cuidado
              de crianças com TEA (autismo).
            </p>
            <div className="mt-8 rounded-lg bg-[#00D084]/10 border-l-4 border-[#00D084] p-6">
              <p className="text-base font-medium text-foreground">
                <strong>Estamos validando a primeira versão do sistema</strong> — participe do início dessa
                transformação e ajude a moldar o futuro do acompanhamento de crianças autistas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-12 text-balance">
              Veja o que estamos desenvolvendo
            </h2>
            <div className="relative">
              <div className="relative aspect-video overflow-hidden rounded-xl border bg-muted">
                <img
                  src={slides[currentSlide].url || "/placeholder.svg"}
                  alt={slides[currentSlide].caption}
                  className="h-full w-full object-contain"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-background/80 backdrop-blur px-4 py-2 text-sm font-medium">
                {currentSlide + 1} / {slides.length}
              </div>
            </div>
            <p className="mt-6 text-center text-lg text-muted-foreground">{slides[currentSlide].caption}</p>
            <p className="mt-4 text-center text-sm text-muted-foreground italic">
              Os layouts podem sofrer alterações, mas será pensado na melhor experiência do usuário.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-[#00D084]" : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Ir para slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-4 text-balance">
              Funcionalidades Principais
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Clique nas funcionalidades que mais te interessam
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <Card
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => handleFeatureClick("metas")}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Target className="h-6 w-6" />
                    </div>
                    <CardTitle>Metas Personalizadas</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Defina objetivos específicos e acompanhe o progresso de cada criança de forma individualizada.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent border-[#00D084] text-[#00D084] hover:bg-[#00D084]/10"
                  >
                    Tenho interesse ({clickedFeatures.metas})
                  </Button>
                </CardFooter>
              </Card>

              <Card
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => handleFeatureClick("comunicacao")}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <CardTitle>Comunicação com Profissionais</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Chat direto entre responsáveis e profissionais para troca de informações e atualizações.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent border-[#00D084] text-[#00D084] hover:bg-[#00D084]/10"
                  >
                    Tenho interesse ({clickedFeatures.comunicacao})
                  </Button>
                </CardFooter>
              </Card>

              <Card
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => handleFeatureClick("relatorios")}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <CardTitle>Relatórios e Progresso</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Visualize o desenvolvimento através de gráficos e relatórios detalhados e intuitivos.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent border-[#00D084] text-[#00D084] hover:bg-[#00D084]/10"
                  >
                    Tenho interesse ({clickedFeatures.relatorios})
                  </Button>
                </CardFooter>
              </Card>

              <Card
                className="cursor-pointer transition-all hover:shadow-lg hover:scale-105"
                onClick={() => handleFeatureClick("ia")}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <Bot className="h-6 w-6" />
                    </div>
                    <CardTitle>IA Assistente</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Inteligência artificial para sugestões personalizadas e análise de progresso automatizada.
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full gap-2 bg-transparent border-[#00D084] text-[#00D084] hover:bg-[#00D084]/10"
                  >
                    Tenho interesse ({clickedFeatures.ia})
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-4 text-balance">
              Planos Simples e Transparentes
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">
              Escolha o plano ideal para suas necessidades
            </p>
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <Card className="relative border-[#00D084]/30">
                <CardHeader>
                  <CardTitle className="text-2xl">Essencial</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#00D084]">R$ 29</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#00D084] mt-0.5 flex-shrink-0" />
                    <span>Acompanhamento básico</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#00D084] mt-0.5 flex-shrink-0" />
                    <span>Chat com profissionais</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#00D084] mt-0.5 flex-shrink-0" />
                    <span>Limite de Crianças</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-[#00D084] text-[#00D084] hover:bg-[#00D084]/10"
                    onClick={() => handlePricingClick("essencial")}
                  >
                    Tenho interesse ({clickedPricing.essencial})
                  </Button>
                </CardFooter>
              </Card>

              <Card className="relative border-[#00D084] shadow-lg">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00D084] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Profissional</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-[#00D084]">R$ 49</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#00D084] mt-0.5 flex-shrink-0" />
                    <span>Crianças ilimitadas</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#00D084] mt-0.5 flex-shrink-0" />
                    <span>Análise de IA</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#00D084] mt-0.5 flex-shrink-0" />
                    <span>Relatórios detalhados</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#00D084] mt-0.5 flex-shrink-0" />
                    <span>Prioridade no suporte</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-[#00D084] hover:bg-[#00B872] text-white"
                    onClick={() => handlePricingClick("profissional")}
                  >
                    Tenho interesse ({clickedPricing.profissional})
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Os valores são apenas estimativas para fins de validação.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registration-form" className="py-16 md:py-24 bg-[#00D084]/5">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-balance">
                Participe do teste gratuito do ConectaTEA
              </h2>
              <p className="text-lg text-muted-foreground">
                Seja um dos primeiros a testar ConectaTEA e ajude a moldar o futuro do acompanhamento de crianças
                autistas.
              </p>
            </div>
            <Card className="border-[#00D084]/20">
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" placeholder="Seu nome completo" className="focus-visible:ring-[#00D084]" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="focus-visible:ring-[#00D084]"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>No ConectaTEA você seria o que:</Label>
                    <RadioGroup defaultValue="pai">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pai" id="pai" className="border-[#00D084] text-[#00D084]" />
                        <Label htmlFor="pai" className="font-normal cursor-pointer">
                          Pai/mãe
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="profissional"
                          id="profissional"
                          className="border-[#00D084] text-[#00D084]"
                        />
                        <Label htmlFor="profissional" className="font-normal cursor-pointer">
                          Profissional
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="clinica" id="clinica" className="border-[#00D084] text-[#00D084]" />
                        <Label htmlFor="clinica" className="font-normal cursor-pointer">
                          Clínica
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outro" id="outro" className="border-[#00D084] text-[#00D084]" />
                        <Label htmlFor="outro" className="font-normal cursor-pointer">
                          Outro
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Idade da criança (se aplicável)</Label>
                    <Input id="age" placeholder="Ex: 5 anos" className="focus-visible:ring-[#00D084]" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tools">Já usa alguma ferramenta semelhante?</Label>
                    <Input
                      id="tools"
                      placeholder="Ex: Google Sheets, Excel, Caderno físico"
                      className="focus-visible:ring-[#00D084]"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Quais recursos mais te interessam?</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="metas" className="border-[#00D084] data-[state=checked]:bg-[#00D084]" />
                        <Label htmlFor="metas" className="font-normal cursor-pointer">
                          Metas personalizadas
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="relatorios" className="border-[#00D084] data-[state=checked]:bg-[#00D084]" />
                        <Label htmlFor="relatorios" className="font-normal cursor-pointer">
                          Relatórios e gráficos
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="chat" className="border-[#00D084] data-[state=checked]:bg-[#00D084]" />
                        <Label htmlFor="chat" className="font-normal cursor-pointer">
                          Chat com profissionais
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="ia-assist" className="border-[#00D084] data-[state=checked]:bg-[#00D084]" />
                        <Label htmlFor="ia-assist" className="font-normal cursor-pointer">
                          IA assistente
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="outro-recurso" className="border-[#00D084] data-[state=checked]:bg-[#00D084]" />
                        <Label htmlFor="outro-recurso" className="font-normal cursor-pointer">
                          Outro
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Quanto pagaria por uma plataforma assim?</Label>
                    <RadioGroup defaultValue="29">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="29" id="price-29" className="border-[#00D084] text-[#00D084]" />
                        <Label htmlFor="price-29" className="font-normal cursor-pointer">
                          R$ 29/mês
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="49" id="price-49" className="border-[#00D084] text-[#00D084]" />
                        <Label htmlFor="price-49" className="font-normal cursor-pointer">
                          R$ 49/mês
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="79" id="price-79" className="border-[#00D084] text-[#00D084]" />
                        <Label htmlFor="price-79" className="font-normal cursor-pointer">
                          R$ 79/mês
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Gostaria de participar do teste beta?</Label>
                    <RadioGroup defaultValue="sim">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="sim" id="beta-sim" className="border-[#00D084] text-[#00D084]" />
                        <Label htmlFor="beta-sim" className="font-normal cursor-pointer">
                          Sim, muito interessado
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nao" id="beta-nao" className="border-[#00D084] text-[#00D084]" />
                        <Label htmlFor="beta-nao" className="font-normal cursor-pointer">
                          Não, apenas observando
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-lg py-6 gap-2 bg-[#00D084] hover:bg-[#00B872] text-white"
                  >
                    Quero participar do teste <ArrowRight className="h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00D084] text-white font-bold text-lg">
                C
              </div>
              <span className="text-xl font-semibold">ConectaTEA</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Transformando a vida das crianças autistas com amor e cuidado.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025 ConectaTEA — Projeto em validação. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-[#00D084] transition-colors">
                Política de Privacidade
              </a>
              <a
                href="mailto:contato@conectatea.com"
                className="text-muted-foreground hover:text-[#00D084] transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
