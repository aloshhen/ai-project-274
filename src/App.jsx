import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  Play,
  Star,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react'

// SafeIcon component for dynamic icon rendering
const SafeIcon = ({ name, size = 24, className = '', color }) => {
  const icons = {
    menu: Menu,
    x: X,
    'arrow-right': ArrowRight,
    zap: Zap,
    shield: Shield,
    globe: Globe,
    cpu: Cpu,
    layers: Layers,
    sparkles: Sparkles,
    'chevron-right': ChevronRight,
    play: Play,
    star: Star,
    'check-circle-2': CheckCircle2,
    'arrow-up-right': ArrowUpRight
  }

  const IconComponent = icons[name] || Zap

  return <IconComponent size={size} className={className} color={color} />
}

// Navigation component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Услуги', href: '#services' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'О нас', href: '#about' },
    { name: 'Контакты', href: '#contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-2xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <SafeIcon name="sparkles" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Nexus
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 bg-white text-slate-950 rounded-full text-sm font-semibold hover:bg-slate-200 transition-all duration-300 hover:scale-105">
              Начать проект
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white"
          >
            <SafeIcon name={isMobileMenuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setIsMobileMenuOpen(false)
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-base font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="mt-4 w-full px-6 py-3 bg-white text-slate-950 rounded-full text-sm font-semibold">
                  Начать проект
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-slate-950">
        {/* Gradient orbs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <SafeIcon name="sparkles" size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-slate-300">Новое поколение digital-решений</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6"
          >
            <span className="bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
              Создаем
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              цифровое будущее
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Мы разрабатываем инновационные веб-приложения, мобильные платформы и цифровые продукты, которые меняют правила игры
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              Обсудить проект
              <SafeIcon name="arrow-right" size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-all duration-300">
              <SafeIcon name="play" size={18} className="text-blue-400" />
              Смотреть видео
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {[
              { value: '150+', label: 'Проектов' },
              { value: '50+', label: 'Клиентов' },
              { value: '8+', label: 'Лет опыта' },
              { value: '99%', label: 'Удовлетворенность' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

// Services Section
const Services = () => {
  const services = [
    {
      icon: 'globe',
      title: 'Веб-разработка',
      description: 'Создаем современные веб-приложения с использованием передовых технологий React, Vue и Node.js',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: 'cpu',
      title: 'Мобильные приложения',
      description: 'Разрабатываем нативные и кроссплатформенные приложения для iOS и Android',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: 'layers',
      title: 'UI/UX Дизайн',
      description: 'Проектируем интуитивно понятные интерфейсы, которые пользователи любят',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: 'shield',
      title: 'Кибербезопасность',
      description: 'Обеспечиваем защиту данных и безопасность ваших цифровых активов',
      color: 'from-emerald-500 to-teal-500',
    },
  ]

  return (
    <section id="services" className="relative py-32 bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            Наши услуги
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
              Комплексные решения
            </span>
            <br />
            <span className="text-slate-600">для вашего бизнеса</span>
          </h2>
          <p className="text-lg text-slate-400">
            От идеи до запуска — мы сопровождаем вас на каждом этапе цифровой трансформации
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                  <SafeIcon name={service.icon} size={28} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                <a href="#" className="inline-flex items-center gap-2 text-white font-medium group/link">
                  Подробнее
                  <SafeIcon name="arrow-up-right" size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Portfolio Section
const Portfolio = () => {
  const projects = [
    {
      title: 'FinTech Platform',
      category: 'Веб-приложение',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      color: 'blue',
    },
    {
      title: 'E-Commerce App',
      category: 'Мобильное приложение',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
      color: 'purple',
    },
    {
      title: 'AI Dashboard',
      category: 'SaaS платформа',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      color: 'pink',
    },
  ]

  return (
    <section id="portfolio" className="relative py-32 bg-slate-950 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
              Портфолио
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Избранные работы
              </span>
            </h2>
          </div>
          <button className="group flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors">
            Смотреть все проекты
            <SafeIcon name="arrow-right" size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="inline-block w-fit px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium mb-3">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-sm font-medium">Смотреть кейс</span>
                  <SafeIcon name="arrow-up-right" size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// About Section
const About = () => {
  const features = [
    'Индивидуальный подход к каждому проекту',
    'Прозрачные процессы и коммуникация',
    'Гарантия качества и соблюдение сроков',
    'Поддержка и развитие после запуска',
  ]

  return (
    <section id="about" className="relative py-32 bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                alt="Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 mix-blend-overlay" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 p-6 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <SafeIcon name="star" size={24} className="text-white" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">4.9/5</div>
                  <div className="text-sm text-slate-400">Рейтинг клиентов</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              О нас
            </span>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Мы команда экспертов,
              </span>
              <br />
              <span className="text-slate-600">влюбленных в технологии</span>
            </h2>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              С 2016 года мы помогаем компаниям трансформировать свои идеи в цифровую реальность.
              Наш подход сочетает техническое совершенство с креативным дизайном.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <SafeIcon name="check-circle-2" size={14} className="text-emerald-400" />
                  </div>
                  <span className="text-slate-300">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <button className="px-8 py-4 bg-white text-slate-950 rounded-full font-semibold hover:bg-slate-200 transition-all duration-300 hover:scale-105">
              Узнать больше о нас
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight"
          >
            Готовы начать свой проект?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
          >
            Давайте обсудим ваши идеи и создадим что-то невероятное вместе
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-xl">
              Бесплатная консультация
            </button>
            <button className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all duration-300">
              Посмотреть кейсы
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="relative py-32 bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
              Контакты
            </span>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                Давайте работать
              </span>
              <br />
              <span className="text-slate-600">вместе</span>
            </h2>

            <p className="text-lg text-slate-400 mb-10">
              Свяжитесь с нами любым удобным способом. Мы всегда на связи и готовы ответить на ваши вопросы.
            </p>

            <div className="space-y-6">
              {[
                { label: 'Email', value: 'hello@nexus.agency', icon: 'globe' },
                { label: 'Телефон', value: '+7 (999) 123-45-67', icon: 'zap' },
                { label: 'Адрес', value: 'Москва, ул. Цифровая, 42', icon: 'shield' },
              ].map((contact, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center">
                    <SafeIcon name={contact.icon} size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 mb-1">{contact.label}</div>
                    <div className="text-white font-medium">{contact.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-white/5"
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Имя</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Тема</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="О чем хотите поговорить?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Сообщение</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Расскажите о вашем проекте..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02]"
              >
                Отправить сообщение
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  return (
    <footer className="relative py-12 bg-slate-950 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <SafeIcon name="sparkles" size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Nexus
            </span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-slate-500 text-center">
            © 2024 Nexus Agency. Все права защищены.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {['twitter', 'github', 'linkedin'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/10 transition-all"
              >
                <SafeIcon name="globe" size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden mobile-safe-container">
      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <CTA />
      <Contact />
      <Footer />
    </div>
  )
}

export default App