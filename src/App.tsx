import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  ShieldCheck,
  BarChart3,
  Users,
  FileText,
  ChevronLeft,
  Menu,
  X,
  ArrowLeft,
  CheckCircle2,
  LayoutDashboard,
  MessageSquare,
  ArrowUpRight,
  Globe,
  Zap,
  Lock,
  Plus,
  Linkedin,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useForm } from '@formspree/react';

// --- Types ---
type Page = 'home' | 'about' | 'how-it-works' | 'pricing' | 'faq' | 'contact' | 'security' | 'legal' | 'news';

// --- Brand / Contact / Social config (from .env) ---
const BRAND_NAME = import.meta.env.VITE_BRAND_NAME;
const EMAIL = import.meta.env.VITE_EMAIL;
const PHONE = import.meta.env.VITE_PHONE;
const WHATSAPP = import.meta.env.VITE_WHATSAPP;
const TWITTER_URL = import.meta.env.VITE_TWITTER_URL;
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL;
const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL;
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const BrandWordmark = ({ className = '' }: { className?: string }) => {
  const parts = (BRAND_NAME || '').trim().split(/\s+/);
  const first = parts[0] || '';
  const rest = parts.slice(1).join(' ');
  return (
    <span className={className}>
      {first.toUpperCase()}
      {rest && <span className="font-light opacity-60"> {rest.toUpperCase()}</span>}
    </span>
  );
};

// --- Components ---

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  icon: Icon
}: {
  children: React.ReactNode,
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white',
  className?: string,
  onClick?: () => void,
  type?: 'button' | 'submit',
  icon?: React.ElementType
}) => {
  const variants = {
    primary: 'bg-primary-dark text-white hover:bg-primary-accent shadow-premium',
    secondary: 'bg-primary-accent text-white hover:bg-opacity-90 shadow-premium',
    outline: 'border border-primary-dark/10 text-primary-dark hover:bg-primary-dark hover:text-white',
    ghost: 'text-muted-gray hover:text-primary-dark hover:bg-black/5',
    white: 'bg-white text-primary-dark hover:bg-soft-accent hover:text-white shadow-premium'
  };

  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]';
  const variantStyles = variants[variant];

  // Simple logic to avoid color conflicts
  const finalStyles = `${baseStyles} ${variantStyles} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={finalStyles}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  );
};

const Card = ({ children, className = '', hover = true, ...props }: { children: React.ReactNode, className?: string, hover?: boolean, [key: string]: any }) => (
  <div {...props} className={`border border-border-subtle rounded-2xl p-8 transition-all duration-500 ${hover ? 'hover:shadow-premium hover:-translate-y-1' : ''} ${className.includes('bg-') ? '' : 'bg-white'} ${className}`}>
    {children}
  </div>
);

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string, value: Page }[] = [
    { label: 'الرئيسية', value: 'home' },
    { label: 'من نحن', value: 'about' },
    { label: 'طريقة العمل', value: 'how-it-works' },
    { label: 'الأسعار', value: 'pricing' },
    { label: 'الأسئلة الشائعة', value: 'faq' },
  ];

  // On pages other than 'home', we always want the dark/scrolled look for visibility
  const isDarkNav = isScrolled || currentPage !== 'home';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isDarkNav ? 'py-3' : 'py-6'}`}>
      <div className={`max-w-7xl mx-auto px-6`}>
        <div className={`flex justify-between items-center transition-all duration-500 px-6 py-3 rounded-2xl ${isDarkNav ? 'glass-dark shadow-glass' : 'bg-transparent'}`}>
          <div
            onClick={() => setCurrentPage('home')}
            className='w-full h-15 flex items-center'
          >
            <img
              src="/logo_large.png"
              alt={BRAND_NAME}
              className="w-56 object-contain transition-all duration-500"
            />
          </div>

          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => setCurrentPage(link.value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300  text-nowrap ${currentPage === link.value
                  ? isDarkNav ? 'bg-white/10 text-white' : 'bg-white/20 text-white'
                  : isDarkNav ? 'text-white/60 hover:text-white hover:bg-white/5' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
              >
                {link.label}
              </button>
            ))}
            <div className={`w-px h-4 mx-3 hidden lg:block ${isDarkNav ? 'bg-white/10' : 'bg-white/20'}`}></div>
            <Button
              variant={isDarkNav ? 'secondary' : 'white'}
              onClick={() => setCurrentPage('contact')}
              className="py-2 px-6 text-sm text-nowrap"
            >
              سجل عقارك
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-xl hover:bg-black/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isDarkNav ? 'text-primary-dark' : 'text-white'} />
            ) : (
              <Menu className={isDarkNav ? 'text-primary-dark' : 'text-white'} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-full left-6 right-6 mt-2 glass-effect shadow-glass rounded-2xl p-6 flex flex-col gap-2 md:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  setCurrentPage(link.value);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-right p-4 rounded-xl text-lg font-medium transition-colors ${currentPage === link.value ? 'bg-primary-dark/5 text-primary-dark' : 'text-muted-gray hover:bg-black/5'}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              className="mt-4 w-full"
              onClick={() => {
                setCurrentPage('contact');
                setIsMobileMenuOpen(false);
              }}
            >
              سجل عقارك
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <footer className="bg-white border-t border-border-subtle py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div
            onClick={() => setCurrentPage('home')}
            className='w-full h-15 flex items-center'
          >
            <img
              src="/logo_large.png"
              alt={BRAND_NAME}
              className="w-56 object-contain transition-all duration-500 brightness-0"
            />
          </div>
          <p className="text-muted-gray max-w-sm leading-relaxed text-lg">
            نحن نعيد تعريف إدارة العقارات طويلة الأمد عبر التكنولوجيا والوضوح التشغيلي التام.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-primary-dark">المنتج</h4>
          <ul className="space-y-4 text-muted-gray">
            <li><button onClick={() => setCurrentPage('how-it-works')} className="hover:text-primary-dark transition-colors cursor-pointer">طريقة العمل</button></li>
            <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-primary-dark transition-colors cursor-pointer">الأسعار</button></li>
            <li><button onClick={() => setCurrentPage('security')} className="hover:text-primary-dark transition-colors cursor-pointer">الأمان</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-primary-dark">الشركة</h4>
          <ul className="space-y-4 text-muted-gray">
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-primary-dark transition-colors cursor-pointer">من نحن</button></li>
            <li><button onClick={() => setCurrentPage('news')} className="hover:text-primary-dark transition-colors cursor-pointer">الأخبار</button></li>
            <li><button onClick={() => setCurrentPage('legal')} className="hover:text-primary-dark transition-colors cursor-pointer">الخصوصية والشروط</button></li>
          </ul>
        </div>
      </div>

      <div className="pt-10 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-muted-gray font-medium">
          © 2026 {BRAND_NAME}. جميع الحقوق محفوظة.
        </div>
        <div className="flex gap-6">
          {TWITTER_URL && (
            <a href={TWITTER_URL} target="_blank" rel="noopener noreferrer" aria-label="X" className="text-muted-gray hover:text-primary-dark transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
          {LINKEDIN_URL && (
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-gray hover:text-primary-dark transition-colors"><Linkedin className="w-5 h-5" /></a>
          )}
          {INSTAGRAM_URL && (
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-gray hover:text-primary-dark transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          )}
          {EMAIL && (
            <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-muted-gray hover:text-primary-dark transition-colors"><Mail className="w-5 h-5" /></a>
          )}
          {PHONE && (
            <a href={`tel:${PHONE}`} aria-label="Phone" className="text-muted-gray hover:text-primary-dark transition-colors"><Phone className="w-5 h-5" /></a>
          )}
          {WHATSAPP && (
            <a href={`https://wa.me/${WHATSAPP.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-gray hover:text-primary-dark transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden bg-primary-dark">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-40"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-accent/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-soft-accent/10 rounded-full blur-[120px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/0 via-primary-dark/50 to-primary-dark"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity }}
          >

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.2] mb-6 tracking-tight text-balance">
              ندير عقارك بالكامل <br />
              <span className="text-soft-accent">طوال مدة الانتفاع</span>
            </h1>
            <p className="text-base md:text-lg text-white/50 mb-10 leading-relaxed max-w-2xl mx-auto font-light text-balance">
              منظومة تشغيل موحدة تدير جميع عمليات العقار ضمن منصة واحدة تضمن استقراره وقيمته عبر الزمن.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                variant="secondary"
                onClick={() => setCurrentPage('contact')}
                className="px-8 py-4 text-sm min-w-[180px]"
                icon={ArrowLeft}
              >
                سجل عقارك
              </Button>
              <Button
                variant="ghost"
                onClick={() => setCurrentPage('how-it-works')}
                className="px-8 py-4 text-sm text-white/70 hover:text-white hover:bg-white/5 border border-white/10 min-w-[180px]"
              >
                كيف نعمل
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 text-white/30">
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold text-white/40">+120</span>
                <span className="text-[10px] uppercase tracking-widest">وحدة تحت الإدارة</span>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="flex flex-col items-center">
                <span className="text-xl font-semibold text-white/40">98%</span>
                <span className="text-[10px] uppercase tracking-widest">استقرار تشغيلي</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">اسحب للأسفل</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"></div>
        </motion.div>
      </section>

      {/* Why Integrated Management Section */}
      <section className="pt-32 bg-white border-border-subtle flex justify-center">
        <div className="max-w-7xl  px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-center md:text-5xl font-bold text-primary-dark mb-8 tracking-tight leading-tight">
              المشكلة ليست في العقار <br />
              <span className="text-soft-accent">بل في طريقة إدارته</span>
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-gray text-center font-light">
                في عقارات الانتفاع طويلة الأمد، لا تكون المشكلة في العقار نفسه، بل في تعدد الجهات التي تديره.
              </p>
              <p className="text-lg text-muted-gray text-center font-light">
                صيانة، محاسبة، تأجير، متابعة تشغيلية كل جهة تعمل بشكل منفصل، بدون منظومة تربطها.
              </p>
              <p className="text-lg text-primary-dark font-medium text-center">
                النتيجة؟<br /> تداخل في المسؤوليات، ضعف في وضوح الأداء، وتراجع تدريجي في حالة الأصل مع مرور الوقت.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="pt-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-dark mb-8 tracking-tight leading-tight">
              كل ما يحتاجه عقارك <br />
              <span className="text-soft-accent">تحت إدارة واحدة</span>
            </h2>
            <div className="space-y-4">
              <p className="text-lg md:text-xl text-muted-gray leading-relaxed font-light">
                إدارة عقارات الانتفاع طويلة الأمد ليست مهام متفرقة <br className="hidden md:block" />
                بل منظومة تشغيل متكاملة تتطلب متابعة مستمرة وانضباطًا عاليًا لسنوات.
              </p>
              <p className="text-lg md:text-xl text-primary-dark font-medium leading-relaxed">
                نحن نوفر إدارة شاملة تغطي كل ما يحتاجه عقارك
              </p>
            </div>
          </div>



          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              { icon: LayoutDashboard, title: "الإدارة التشغيلية", desc: "تشغيل يومي منضبط يحافظ على استقرار العقار بدون انقطاع" },
              { icon: BarChart3, title: "الإدارة المالية", desc: "تدفقات واضحة وتحكم كامل في الأداء المالي" },
              { icon: ShieldCheck, title: "الصيانة وحماية الأصل", desc: "حفاظ مستمر على جودة العقار وتقليل التآكل التشغيلي" },
              { icon: Users, title: "العلاقة الإيجارية", desc: "إشغال مستقر وإدارة احترافية للعلاقة مع المستفيد" },
              { icon: FileText, title: "تقارير الأداء", desc: "رؤية واضحة تدعم اتخاذ القرار بثقة" },
              { icon: MessageSquare, title: "تجربة المستفيد", desc: "تنظيم كامل للتواصل يرفع جودة التشغيل" },
            ].map((item, i) => (
              <div key={i} className="group p-10 bg-light-bg/50 rounded-2xl border border-border-subtle hover:border-soft-accent/20 transition-all duration-500 hover:shadow-premium hover:-translate-y-1">
                <div className="w-12 h-12 bg-white text-primary-dark rounded-xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-primary-dark group-hover:text-white transition-all duration-500">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-primary-dark tracking-tight group-hover:text-soft-accent transition-colors">{item.title}</h3>
                <p className="text-sm text-muted-gray leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-8 pt-5 border-border-subtle">
            <div className="text-center max-w-4xl mx-auto mb-5">
              <h2 className="text-4xl md:text-6xl font-bold text-primary-dark mb-8 tracking-tight leading-tight">

                <span className="text-soft-accent">النتيجة ؟ </span>
              </h2>
              <div className="space-y-4">
                <p className="text-lg md:text-xl text-primary-dark font-medium leading-relaxed">
                  بدلاً من التعامل مع جهات متعددة، تحصل على إدارة موحدة توفر لك <br className="hidden md:block" />
                  وضوح كامل في الأداء، استقرار مالي مستمر، وحماية طويلة الأمد لقيمة عقارك.
                </p>
              </div>
            </div>
            {/* Centered 2x2 Grid */}
            <div className="flex justify-center gap-5 flex-wrap mb-5 max-w-7xl">

              {[
                { title: 'إدارة واحدة', desc: 'بدلاً من عدة جهات متفرقة' },
                { title: 'وضوح كامل', desc: 'كل شيء مرتبط في نظام واحد' },
                { title: 'استقرار طويل الأمد', desc: 'تشغيل مستمر بدون تذبذب' },
                { title: 'حماية الأصل', desc: 'صيانة وإدارة تحافظ على القيمة' },
              ].map((item, i) => (
                <div key={i} className="group p-8 bg-light-bg rounded-3xl border border-border-subtle hover:border-soft-accent/30 transition-all duration-500 hover:shadow-premium">
                  <div className="text-xl font-bold text-primary-dark mb-2 tracking-tight group-hover:text-soft-accent transition-colors">{item.title}</div>
                  <div className="text-sm text-muted-gray leading-relaxed font-light">{item.desc}</div>
                </div>
              ))}

            </div>

            <Button
              variant="secondary"
              onClick={() => setCurrentPage('contact')}
              className="px-12 py-5 text-lg shadow-xl hover:shadow-2xl transition-all"
              icon={ArrowLeft}
            >
              ابدأ إدارة عقارك بشكل صحيح
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Summary Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-primary-dark mb-8 leading-tight tracking-tight">
                لا اشتراك؟ لا التزام؟ <br />
                <span className="text-soft-accent">لا تدفع إلا إذا طلبت</span>
              </h2>
              <p className="text-xl text-muted-gray mb-10 leading-relaxed font-light">
                نؤمن أن إدارة العقار لا يجب أن تكون التزامًا ماليًا ثابتًا، ولا اشتراكًا شهريًا تدفعه سواء استخدمت الخدمة أو لا.
                <br /><br />
                لذلك، نموذجنا بسيط: <br />
                كل خدمة تطلبها تدفع مقابلها فقط.
              </p>
              <div className="space-y-6 mb-10">
                {[
                  { title: "بدون التزام", desc: "نركز على تقديم القيمة التشغيلية أولاً." },
                  { title: "تدفع عند الطلب فقط", desc: "شفافية كاملة في كافة التكاليف التشغيلية." },
                  { title: "تكلفة واضحة لكل خدمة", desc: "مرونة عالية تتوافق مع احتياجات عقارك." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-accent/5 text-primary-accent flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary-dark mb-1">{item.title}</h4>
                      <p className="text-muted-gray">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="primary" onClick={() => setCurrentPage('contact')} icon={ArrowLeft}>
                سجل عقارك الآن
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card className="p-10 bg-light-bg border-border-subtle" hover={false}>
                <h4 className="text-xl font-bold text-primary-dark mb-4 tracking-tight">ما الذي يؤثر على تكلفة الإدارة؟</h4>
                <ul className="space-y-4 text-muted-gray">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-accent"></div>
                    <span>حجم العقار وعدد الوحدات</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-accent"></div>
                    <span>نوع الخدمة المطلوبة</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-accent"></div>
                    <span>مستوى التشغيل والخدمة</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-10 bg-primary-dark text-white border-none flex flex-col items-center justify-center text-center" hover={false}>
                <div className="text-xs font-bold text-soft-accent uppercase tracking-widest mb-4">نموذج العمل</div>
                <div className="text-2xl font-bold mb-2">إدارة كاملة بدون التزام</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-32 bg-light-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-6 tracking-tight">متابعة واضحة لأداء عقارك</h2>
            <p className="text-xl text-muted-gray max-w-2xl mx-auto leading-relaxed font-light">
              لوحات متابعة متقدمة تعرض الأداء المالي والتشغيلي للعقار بطريقة عملية وسهلة القراءة، تمنحك السيطرة الكاملة على أصولك.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-accent/10 to-soft-accent/10 rounded-[40px] blur-3xl opacity-50"></div>

            <Card className="relative overflow-hidden p-0 border-border-subtle shadow-2xl bg-white rounded-[32px]" hover={false}>
              {/* Dashboard Header */}
              <div className="bg-white border-b border-border-subtle p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="h-4 w-px bg-black/10 mx-2"></div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary-dark/40" />
                    <span className="text-sm font-bold text-primary-dark tracking-tight">Property Overview — Tower A</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-dark/5 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary-dark/40" />
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {[
                    { label: "الحالة التشغيلية", value: "مستقر", trend: "جميع العمليات منتظمة", color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
                    { label: "نسبة الإشغال", value: "98.4%", trend: "+2.1% عن الشهر الماضي", color: "text-primary-accent", bg: "bg-primary-accent/5", border: "border-primary-accent/10" },
                    { label: "طلبات الصيانة", value: "12", trend: "8 تحت المعالجة", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
                  ].map((stat, i) => (
                    <div key={i} className={`p-6 rounded-2xl border ${stat.border} ${stat.bg} transition-transform hover:scale-[1.02] duration-300`}>
                      <div className="text-[10px] font-bold text-muted-gray mb-3 uppercase tracking-widest opacity-70">{stat.label}</div>
                      <div className="text-3xl font-bold text-primary-dark tracking-tight mb-2">{stat.value}</div>
                      <div className={`text-[11px] font-bold ${stat.color} flex items-center gap-1.5`}>
                        {i === 1 ? <ArrowUpRight className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {stat.trend}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="p-6 bg-light-bg rounded-2xl border border-black/5">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-bold text-primary-dark uppercase tracking-widest">مؤشر الأداء المالي</h4>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary-accent"></div>
                          <div className="w-2 h-2 rounded-full bg-soft-accent"></div>
                        </div>
                      </div>
                      <div className="h-48 flex items-end justify-between gap-2 px-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ delay: i * 0.05, duration: 0.8 }}
                            className={`w-full rounded-t-lg ${i === 11 ? 'bg-primary-accent' : 'bg-primary-dark/10'}`}
                          ></motion.div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-4 text-[10px] font-bold text-muted-gray uppercase tracking-widest opacity-50">
                        <span>يناير</span>
                        <span>يونيو</span>
                        <span>ديسمبر</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-white border border-black/5 rounded-2xl shadow-sm">
                      <h4 className="text-sm font-bold text-primary-dark uppercase tracking-widest mb-6">توزيع المصروفات</h4>
                      <div className="space-y-4">
                        {[
                          { label: "صيانة وقائية", value: 45, color: "bg-primary-accent" },
                          { label: "تشغيل يومي", value: 30, color: "bg-soft-accent" },
                          { label: "خدمات عامة", value: 25, color: "bg-primary-dark/20" },
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs font-bold mb-2">
                              <span className="text-primary-dark">{item.label}</span>
                              <span className="text-muted-gray">{item.value}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.value}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${item.color}`}
                              ></motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 bg-primary-dark rounded-2xl text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-soft-accent" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">تنبيه ذكي</div>
                          <div className="text-sm font-bold">توفير طاقة محتمل</div>
                        </div>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed">تم رصد انخفاض في استهلاك الطاقة بنسبة 12% بعد تحديث أنظمة الإضاءة.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32 bg-primary-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-accent opacity-10 blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
                إدارة مصممة <br />
                <span className="text-soft-accent">لحقوق تمتد لعقود</span>
              </h2>
              <p className="text-xl text-white/80 mb-12 leading-relaxed font-light">
                العقارات المرتبطة بحقوق انتفاع طويلة الأمد لا تُدار بنفس طريقة العقارات التقليدية.
                <br /><br />
                تحتاج إلى منظومة تشغيل تركز على الاستقرار، وضوح الأداء، واستدامة القيمة على مدى سنوات طويلة، وليس مجرد إدارة يومية.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "تشغيل مستقر على الأمد الطويل",
                  "وضوح كامل في الأداء والتدفقات",
                  "حماية مستمرة لقيمة العقار",
                  "إدارة منظمة للعلاقة بين جميع الأطراف"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6 text-soft-accent" />
                    <span className="text-white font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="relative">
              <div className="aspect-square bg-white/5 rounded-[40px] border border-white/10 p-12 flex items-center justify-center overflow-hidden relative group">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                  <div className="grid grid-cols-12 h-full w-full">
                    {Array.from({ length: 144 }).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-white/20"></div>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 text-center">
                  <div className="text-sm font-bold text-soft-accent/60 uppercase tracking-widest mb-4">مدة الانتفاع</div>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-[12rem] font-bold text-soft-accent leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                  >
                    99
                  </motion.div>
                  <div className="text-xl font-light text-white/80 mt-8 max-w-[280px] mx-auto leading-relaxed">
                    99 سنة ليست مدة <br />
                    بل مسؤولية تشغيل مستمرة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-light-bg">
        <div className="max-w-6xl mx-auto px-6">
          <Card className="relative overflow-hidden p-20 md:p-32 text-center border-none bg-[#0B0B0B] rounded-[48px] shadow-2xl" hover={false}>
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-accent/10 blur-[120px]"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 tracking-tight leading-tight">
                هل أنت مستعد تشوف <br />
                عقارك بشكل مختلف؟
              </h2>
              <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                خلنا ندير لك التفاصيل ونرجع لك الوضوح.
              </p>
              <div className="flex flex-col items-center gap-6">
                <Button
                  variant="white"
                  onClick={() => setCurrentPage('contact')}
                  className="px-16 py-6 text-xl rounded-full hover:scale-105 transition-transform duration-300"
                  icon={ArrowLeft}
                >
                  سجل عقارك
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => (
  <div className="pt-48 pb-32 bg-light-bg">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-primary-dark mb-4 tracking-tight">لا ندير عقارات <br /> <span className="text-muted-gray">ندير استمراريتها.</span></h1>
        <div className="text-lg font-bold text-primary-accent uppercase tracking-[0.2em] mb-12">تشغيل واضح, نتائج مستمرة, بدون تعقيد</div>

        <div className="space-y-10 text-xl text-muted-gray leading-relaxed font-light">
          <p className="text-primary-dark font-medium text-2xl">
            نحن في {BRAND_NAME} لا نقدم خدمات متفرقة، بل نبني منظومة تشغيل متكاملة لإدارة العقارات طويلة الأمد.
          </p>
          <p>
            نركز على وضوح الأداء، استقرار التشغيل، واستدامة القيمة<br />لضمان أن يعمل عقارك بكفاءة اليوم ويستمر بنفس الجودة لسنوات.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-10">
            <h3 className="text-2xl font-bold text-primary-dark mb-6 tracking-tight">قيمنا</h3>
            <ul className="space-y-4 text-muted-gray text-lg">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary-accent" /> وضوح كامل</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary-accent" /> تشغيل منضبط</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary-accent" /> استقرار طويل المدى</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary-accent" /> مسؤولية تشغيلية حقيقية</li>
            </ul>
          </Card>
          <Card className="p-10">
            <h3 className="text-2xl font-bold text-primary-dark mb-6 tracking-tight">رؤيتنا</h3>
            <p className="text-muted-gray text-lg leading-relaxed">أن نعيد تعريف إدارة العقارات طويلة الأمد</p>
          </Card>
        </div>
      </motion.div>
    </div>
  </div>
);

const HowItWorksPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  const steps = [
    {
      title: "تحليل العقار",
      desc: "نبدأ بفهم وضع العقار وتحليل أدائه الحالي.",
      icon: BarChart3
    },
    {
      title: "تصميم النموذج",
      desc: "نبني نموذج إدارة مخصص يناسب أهدافك.",
      icon: LayoutDashboard
    },
    {
      title: "الربط والتجهيز",
      desc: "نربط جميع العمليات في نظام واحد واضح.",
      icon: Zap
    },
    {
      title: "التشغيل والمتابعة",
      desc: "نتولى التشغيل الكامل مع متابعة مستمرة.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="pt-48 pb-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-8xl font-bold text-[#0B0B0B] mb-10 tracking-tight leading-[1.1]">كيف نعمل <span className='text-[#6B7280]'>معك؟</span></h1>
          <p className="text-xl md:text-xl text-[#6B7280] max-w-3xl mx-auto leading-relaxed font-light mb-4">
            نتبع منهجية منظمة تضمن انتقالاً سلساً لإدارة عقارك، مع التركيز على الوضوح التام في كل خطوة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group"
            >
              <Card className="h-full p-10 bg-white border border-[#0B0B0B]/5 shadow-sm hover:shadow-md transition-all duration-500 rounded-3xl" hover={false}>
                <div className="mb-8">
                  <step.icon className="w-8 h-8 text-[#0B0B0B]/40 group-hover:text-primary-accent transition-colors duration-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B0B0B] mb-4 tracking-tight">{step.title}</h3>
                <p className="text-[#6B7280] leading-relaxed font-light">{step.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto">
          <Card className="relative overflow-hidden p-20 md:p-32 text-center border-none bg-[#0B0B0B] rounded-[48px] shadow-2xl" hover={false}>
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-accent/10 blur-[120px]"></div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-10 tracking-tight leading-tight">
                هل أنت مستعد تشوف <br />
                عقارك بشكل مختلف؟
              </h2>
              <p className="text-xl md:text-2xl text-white/60 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                خلنا ندير لك التفاصيل ونرجع لك الوضوح.
              </p>
              <Button
                variant="white"
                onClick={() => setCurrentPage('contact')}
                className="px-16 py-6 text-xl w-fit mx-auto rounded-full hover:scale-105 transition-transform duration-300"
                icon={ArrowLeft}
              >
                سجل عقارك
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SecurityPage = () => {
  const features = [
    {
      title: "تشفير البيانات بالكامل",
      desc: "نستخدم بروتوكولات تشفير متقدمة (AES-256) لحماية كافة بيانات العقود، المستأجرين، والمعلومات المالية.",
      icon: ShieldCheck
    },
    {
      title: "شفافية مالية مطلقة",
      desc: "نظامنا المالي يضمن تتبع كل ريال يتم تحصيله أو صرفه، مع تقارير مدققة متاحة لك في أي وقت.",
      icon: BarChart3
    },
    {
      title: "إدارة الوصول والصلاحيات",
      desc: "نظام دقيق للصلاحيات يضمن أن المعلومات الحساسة لا تظهر إلا للأشخاص المخولين فقط.",
      icon: Lock
    },
    {
      title: "الالتزام بالأنظمة المحلية",
      desc: "كافة عملياتنا متوافقة تماماً مع أنظمة الهيئة العامة للعقار ومنصة إيجار في المملكة العربية السعودية.",
      icon: Building2
    }
  ];

  return (
    <div className="pt-48 pb-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary-dark/5 text-primary-dark text-sm font-bold mb-6 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-soft-accent" />
            حماية أصولك
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-dark mb-8 tracking-tight">الأمان في <br /> <span className="text-muted-gray">قلب عملياتنا</span></h1>
          <p className="text-xl text-muted-gray max-w-2xl mx-auto leading-relaxed font-light">
            نحن ندرك أن عقارك هو استثمارك الأهم، لذلك نضع معايير أمان صارمة لحماية بياناتك وأموالك وأصولك العقارية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {features.map((feature, i) => (
            <Card key={i} className="p-10 bg-white border border-border-subtle" hover={true}>
              <div className="w-14 h-14 rounded-2xl bg-primary-dark/5 flex items-center justify-center text-primary-dark mb-8">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-lg text-muted-gray leading-relaxed font-light">{feature.desc}</p>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-12 bg-primary-dark text-white rounded-[40px] relative overflow-hidden" hover={false}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-accent/20 blur-[100px]"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-6 tracking-tight">نظام النسخ الاحتياطي</h2>
                <p className="text-lg text-white/70 leading-relaxed font-light">
                  يتم إجراء نسخ احتياطي يومي لكافة البيانات في خوادم آمنة ومتعددة المواقع لضمان استمرارية العمل وعدم فقدان أي معلومة تحت أي ظرف.
                </p>
              </div>
              <div className="w-32 h-32 rounded-full border-4 border-white/10 flex items-center justify-center">
                <Zap className="w-12 h-12 text-primary-accent" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const LegalPage = () => {
  return (
    <div className="pt-48 pb-32 bg-light-bg">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-dark mb-8 tracking-tight">الخصوصية والشروط</h1>
          <p className="text-xl text-muted-gray leading-relaxed font-light">
            نحن نلتزم بأعلى معايير الشفافية والوضوح في التعامل مع بياناتك وحقوقك كشريك معنا.
          </p>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-dark/5 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              سياسة الخصوصية
            </h2>
            <div className="prose prose-lg text-muted-gray max-w-none space-y-6 font-light">
              <p>نحن في {BRAND_NAME} نولي أهمية قصوى لخصوصية بياناتك. نجمع فقط المعلومات الضرورية لإدارة عقارك وتقديم خدماتنا بكفاءة.</p>
              <ul className="list-disc list-inside space-y-3">
                <li>يتم تخزين كافة البيانات المالية والشخصية في خوادم مشفرة وآمنة.</li>
                <li>لا نقوم بمشاركة بياناتك مع أي طرف ثالث لأغراض تسويقية.</li>
                <li>لديك الحق الكامل في الوصول إلى بياناتك وطلب تعديلها أو حذفها في أي وقت.</li>
                <li>نستخدم ملفات تعريف الارتباط (Cookies) فقط لتحسين تجربة المستخدم على منصتنا.</li>
              </ul>
            </div>
          </section>

          <div className="h-px bg-border-subtle w-full"></div>

          <section>
            <h2 className="text-3xl font-bold text-primary-dark mb-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-dark/5 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              شروط الخدمة
            </h2>
            <div className="prose prose-lg text-muted-gray max-w-none space-y-6 font-light">
              <p>باستخدامك لخدماتنا، فإنك توافق على الالتزام بالشروط التالية التي تضمن حقوق الطرفين:</p>
              <ul className="list-disc list-inside space-y-3">
                <li>تلتزم الشركة بتقديم تقارير دورية دقيقة عن حالة العقار والتحصيلات المالية.</li>
                <li>يتحمل المالك مسؤولية صحة المستندات القانونية المقدمة للعقار.</li>
                <li>تخضع كافة العقود والاتفاقيات للأنظمة والقوانين المعمول بها في المملكة العربية السعودية.</li>
                <li>يتم تحديد الرسوم والعمولات بناءً على الاتفاقية الموقعة بين الطرفين وبكل شفافية.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const FAQPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "هل يوجد التزام طويل الأمد؟",
      a: "لا، **بدون أي التزام طويل الأمد**. يمكنك البدء أو التوقف في أي وقت حسب احتياجك التشغيلي."
    },
    {
      q: "كيف يتم احتساب الرسوم؟",
      a: "نموذجنا يعتمد على الطلب؛ **تدفع فقط عند طلب الخدمة**. إذا لم تطلب أي خدمة تشغيلية، لا تدفع شيئاً."
    },
    {
      q: "ما الذي يميز نموذج إدارتكم؟",
      a: "نحن نوفر **منظومة تشغيل متكاملة** تجمع كافة الجوانب التشغيلية والمالية والفنية تحت إدارة واحدة، مما يضمن وضوح الرؤية واستقرار الأداء."
    },
    {
      q: "هل يمكن إدارة عقار قائم حاليًا؟",
      a: "نعم، يمكننا استلام إدارة العقارات القائمة وإعادة تنظيم عملياتها وفق **نموذجنا المتكامل** لتحسين أدائها ورفع كفاءتها."
    },
    {
      q: "كيف أبدأ معكم؟",
      a: "ببساطة، اطلب مراجعة لعقارك، وسيقوم فريقنا بتصميم **نموذج إدارة مخصص** يناسب أهدافك."
    }
  ];

  return (
    <div className="pt-48 pb-32 bg-light-bg">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-dark mb-8 tracking-tight leading-tight">الأسئلة الشائعة</h1>
          <p className="text-xl text-muted-gray font-light">كل ما تحتاج معرفته عن نموذج إدارتنا الحديث والشفاف.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-border-subtle rounded-[32px] overflow-hidden transition-all duration-500 hover:border-primary-dark/20 hover:shadow-xl group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-10 text-right flex justify-between items-center hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-xl md:text-2xl font-bold text-primary-dark tracking-tight leading-tight">{faq.q}</span>
                <div className={`w-10 h-10 rounded-full bg-primary-dark/5 flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${openIndex === i ? '-rotate-90 bg-primary-dark' : ''}`}>
                  <ChevronLeft className="w-6 h-6" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-10 pb-10"
                  >
                    <div className="text-xl text-muted-gray leading-[1.8] font-light">
                      {faq.a.split('**').map((part, index) =>
                        index % 2 === 1 ? <strong key={index} className="text-primary-dark font-bold">{part}</strong> : part
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA Section below FAQ */}
        <div className="mt-32 text-center">
          <Card className="p-16 bg-white border border-border-subtle rounded-[40px] shadow-2xl" hover={false}>
            <h2 className="text-3xl md:text-5xl font-bold text-primary-dark mb-8 tracking-tight">جاهز تبدأ بدون التزام؟</h2>
            <div className="flex justify-center">
              <Button
                variant="primary"
                onClick={() => setCurrentPage('contact')}
                className="px-16 py-6 text-xl rounded-full"
                icon={ArrowLeft}
              >
                سجل عقارك
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const PricingPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => (
  <div className="pt-48 pb-32 bg-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-8xl font-bold text-[#0B0B0B] mb-8 tracking-tight leading-tight">
          تعرف بالضبط <br />
          <span className="text-[#6B7280]">مقابل إيش تدفع</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#6B7280] max-w-3xl mx-auto leading-relaxed font-light mb-12">
          نموذج تسعير شفاف يعتمد على واقع تشغيل عقارك، مو أرقام عشوائية.
        </p>

        {/* Business Model Highlight */}
        <div className="inline-block max-w-2xl mx-auto p-8 rounded-[32px] bg-[#0B0B0B] text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6 text-right md:text-center">
            <div>
              <div className="text-xl font-bold mb-1">بدون التزام طويل الأمد</div>
              <div className="text-white/70 font-light">تدفع فقط عند طلب الخدمة وإذا ما طلبت، ما تدفع شيء.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mb-48">
        <h2 className="text-3xl font-bold text-[#0B0B0B] mb-16 text-center tracking-tight">كيف نحسب الرسوم؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            { title: "عدد الوحدات", desc: "كل ما زاد حجم المحفظة، تغيّر نموذج التسعير." },
            { title: "نطاق الإدارة", desc: "من إدارة جزئية إلى تشغيل كامل." },
            { title: "الخدمات الفنية", desc: "الصيانة، الإشراف، والتدخلات التشغيلية." },
            { title: "التقارير والمتابعة", desc: "مستوى التفاصيل والتقارير المطلوبة." }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[32px] border border-[#0B0B0B]/5 hover:border-[#0B0B0B]/10 transition-all duration-500 hover:bg-[#FAFAFA]">
              <h3 className="text-2xl font-bold text-[#0B0B0B] mb-4 tracking-tight">{item.title}</h3>
              <p className="text-[#6B7280] text-lg leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-[#0B0B0B] mb-8 tracking-tight">خلنا نحسبها لك بدقة</h2>
        <p className="text-xl text-[#6B7280] mb-16 max-w-2xl mx-auto font-light leading-relaxed">
          خلال دقائق، نعطيك تصور واضح لتكلفة إدارة عقارك بدون أي التزام.
        </p>
        <div className="flex justify-center">
          <Button
            variant="primary"
            onClick={() => setCurrentPage('contact')}
            className="px-20 py-6 text-xl rounded-full bg-[#0B0B0B] text-white hover:scale-105 transition-transform duration-300"
            icon={ArrowLeft}
          >
            سجل عقارك
          </Button>
        </div>
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const [step, setStep] = useState(1);
  const [step1Values, setStep1Values] = useState({ name: '', phone: '', email: '' });
  const [state, formspreeSubmit, resetForm] = useForm(FORMSPREE_ID);

  const isSubmitting = state.submitting;
  const submitted = state.succeeded;
  const formError = state.errors
    ? state.errors.getFormErrors().map((err) => err.message).join(', ') || 'حدث خطأ في إرسال النموذج'
    : '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (step === 1) {
      setStep1Values({
        name: String(fd.get('name') ?? ''),
        phone: String(fd.get('phone') ?? ''),
        email: String(fd.get('email') ?? ''),
      });
      setStep(2);
      return;
    }
    formspreeSubmit({
      ...step1Values,
      city: String(fd.get('city') ?? ''),
      units: String(fd.get('units') ?? ''),
      status: String(fd.get('status') ?? ''),
      message: String(fd.get('message') ?? ''),
    });
  };

  const handleReset = () => {
    resetForm();
    setStep1Values({ name: '', phone: '', email: '' });
    setStep(1);
  };

  return (
    <div className="pt-48 pb-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="text-5xl md:text-8xl font-bold text-[#0B0B0B] mb-8 tracking-tight leading-tight">ابدأ تنظيم <br /> <span className="text-[#6B7280]">إدارة عقارك</span></h1>
          <p className="text-xl md:text-2xl text-[#6B7280] mb-12 leading-relaxed font-light max-w-lg">
            فريقنا جاهز لمناقشة احتياجات عقارك وتصميم نموذج إدارة مناسب يضمن لك الاستقرار والوضوح التام.
          </p>

          <div className="space-y-12">
            <div className="flex items-center gap-6 group">
              <div className="w-16 h-16 bg-[#FAFAFA] border border-[#0B0B0B]/5 text-[#0B0B0B] rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-[#0B0B0B] group-hover:text-white">
                <Building2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#0B0B0B] mb-1 tracking-tight">المقر الرئيسي</h4>
                <p className="text-[#6B7280] text-lg">السعودية، مدينة الرياض، طريق الملك فهد</p>
              </div>
            </div>
            {EMAIL && (
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-[#FAFAFA] border border-[#0B0B0B]/5 text-[#0B0B0B] rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-[#0B0B0B] group-hover:text-white">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0B0B0B] mb-1 tracking-tight">تواصل مباشر</h4>
                  <a href={`mailto:${EMAIL}`} className="text-[#6B7280] text-lg hover:text-[#0B0B0B] transition-colors">{EMAIL}</a>
                </div>
              </div>
            )}
            {PHONE && (
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-[#FAFAFA] border border-[#0B0B0B]/5 text-[#0B0B0B] rounded-3xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:bg-[#0B0B0B] group-hover:text-white">
                  <Phone className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#0B0B0B] mb-1 tracking-tight">اتصل بنا</h4>
                  <a href={`tel:${PHONE}`} dir="ltr" className="text-[#6B7280] text-lg hover:text-[#0B0B0B] transition-colors">{PHONE}</a>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <Card className="p-10 md:p-16 bg-white border border-[#0B0B0B]/5 rounded-[48px] shadow-2xl relative z-10" hover={false}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-10">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-4xl font-bold text-[#0B0B0B] mb-6 tracking-tight">تم استلام طلبك بنجاح</h3>
                <p className="text-[#6B7280] text-xl mb-12 font-light">سيتواصل معك فريقنا خلال 48 ساعة لترتيب موعد التقييم الأولي.</p>
                <Button variant="outline" onClick={handleReset} className="px-12 py-4 rounded-full">
                  إرسال طلب آخر
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm font-bold text-[#0B0B0B]/40 uppercase tracking-widest">الخطوة {step} من 2</div>
                  <div className="flex gap-2">
                    <div className={`w-8 h-1.5 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#0B0B0B]' : 'bg-[#0B0B0B]/10'}`}></div>
                    <div className={`w-8 h-1.5 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#0B0B0B]' : 'bg-[#0B0B0B]/10'}`}></div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-bold text-[#0B0B0B] tracking-tight">خلنا نبدأ بمعلومات بسيطة</h3>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-[#0B0B0B]">الاسم الكامل</label>
                        <input required name="name" type="text" defaultValue={step1Values.name} placeholder="مثلاً: فيصل بن عبدالعزيز" className="w-full mt-2 p-5 bg-[#FAFAFA] border border-[#0B0B0B]/5 rounded-2xl focus:ring-2 focus:ring-[#0B0B0B]/5 focus:border-[#0B0B0B] outline-none transition-all placeholder:text-[#0B0B0B]/20" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-[#0B0B0B]">رقم الجوال</label>
                        <input required name="phone" type="tel" defaultValue={step1Values.phone} placeholder="05XXXXXXXX (للتواصل السريع)" className="w-full mt-2 p-5 bg-[#FAFAFA] border border-[#0B0B0B]/5 rounded-2xl focus:ring-2 focus:ring-[#0B0B0B]/5 focus:border-[#0B0B0B] outline-none transition-all text-left placeholder:text-[#0B0B0B]/20" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-[#0B0B0B]">البريد الإلكتروني</label>
                        <input required name="email" type="email" defaultValue={step1Values.email} placeholder="name@company.com (لإرسال التقرير)" className="w-full mt-2 p-5 bg-[#FAFAFA] border border-[#0B0B0B]/5 rounded-2xl focus:ring-2 focus:ring-[#0B0B0B]/5 focus:border-[#0B0B0B] outline-none transition-all text-left placeholder:text-[#0B0B0B]/20" />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h3 className="text-2xl font-bold text-[#0B0B0B] tracking-tight">عطنا تفاصيل أكثر عن عقارك</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-[#0B0B0B]">المدينة</label>
                          <input required name="city" type="text" placeholder="الرياض، جدة، الخبر..." className="w-full mt-2 p-5 bg-[#FAFAFA] border border-[#0B0B0B]/5 rounded-2xl focus:ring-2 focus:ring-[#0B0B0B]/5 focus:border-[#0B0B0B] outline-none transition-all placeholder:text-[#0B0B0B]/20" />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-[#0B0B0B]">عدد الوحدات</label>
                          <input required name="units" type="number" placeholder="مثلاً: 12 وحدة" className="w-full mt-2 p-5 bg-[#FAFAFA] border border-[#0B0B0B]/5 rounded-2xl focus:ring-2 focus:ring-[#0B0B0B]/5 focus:border-[#0B0B0B] outline-none transition-all placeholder:text-[#0B0B0B]/20" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-[#0B0B0B]">الحالة الحالية للعقار</label>
                        <select name="status" className="w-full mt-2 p-5 bg-[#FAFAFA] border border-[#0B0B0B]/5 rounded-2xl focus:ring-2 focus:ring-[#0B0B0B]/5 focus:border-[#0B0B0B] outline-none transition-all appearance-none cursor-pointer">
                          <option>مؤجر بالكامل</option>
                          <option>مؤجر جزئياً</option>
                          <option>شاغر</option>
                          <option>قيد الإنشاء</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-bold text-[#0B0B0B]">رسالة إضافية (اختياري)</label>
                        <textarea name="message" rows={3} placeholder="أخبرنا عن نوع العقار أو أي تفاصيل تهمك..." className="w-full mt-2 p-5 bg-[#FAFAFA] border border-[#0B0B0B]/5 rounded-2xl focus:ring-2 focus:ring-[#0B0B0B]/5 focus:border-[#0B0B0B] outline-none transition-all resize-none placeholder:text-[#0B0B0B]/20"></textarea>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col gap-4">
                  {formError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">
                      {formError}
                    </div>
                  )}
                  <Button
                    type="submit"
                    className="w-full py-6 text-xl rounded-full bg-[#0B0B0B] text-white hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? "جاري الإرسال..." : step === 1 ? "التالي" : "احصل على تقييم مجاني"}
                  </Button>
                  <p className="text-center text-xs text-[#6B7280] font-bold">
                    بدون أي التزام نبدأ فقط إذا قررت
                  </p>
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-sm font-bold text-[#0B0B0B]/40 hover:text-[#0B0B0B] transition-colors mt-2"
                    >
                      العودة للخطوة السابقة
                    </button>
                  )}
                </div>
                <p className="text-center text-xs text-[#6B7280] font-medium pt-4 border-t border-[#0B0B0B]/5">بإرسال هذا النموذج، فإنك توافق على سياسة الخصوصية الخاصة بنا.</p>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

const NewsPage = () => {
  const newsArticles = [
    {
      date: "15 مارس 2026",
      title: `توسع ${BRAND_NAME} في السوق السعودي`,
      excerpt: "نعلن عن افتتاح مكاتب جديدة في جدة والدمام لتقديم خدمات إدارة عقارات أفضل",
      category: "أخبار الشركة"
    },
    {
      date: "10 مارس 2026",
      title: "تقرير: نمو قطاع الإدارة العقارية بنسبة 23%",
      excerpt: "دراسة جديدة تظهر نمواً ملحوظاً في الطلب على خدمات الإدارة العقارية المتكاملة",
      category: "تقارير السوق"
    },
    {
      date: "5 مارس 2026",
      title: "إطلاق لوحة التحكم الذكية للعملاء",
      excerpt: "منصة جديدة توفر رؤية شاملة ومباشرة لأداء العقارات في الوقت الفعلي",
      category: "تحديثات المنتج"
    }
  ];

  return (
    <div className="pt-48 pb-32 bg-light-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <div className="inline-block px-4 py-1 rounded-full bg-primary-dark/5 text-primary-dark text-sm font-bold mb-6 uppercase tracking-widest">آخر الأخبار</div>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-dark mb-8 tracking-tight">تابع آخر <br /> <span className="text-muted-gray">مستجداتنا</span></h1>
          <p className="text-xl text-muted-gray max-w-2xl mx-auto leading-relaxed font-light">
            كل ما هو جديد في عالم إدارة العقارات والتطورات في خدماتنا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, i) => (
            <Card key={i} className="p-8 bg-white border border-border-subtle group cursor-pointer" hover={true}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-bold text-primary-accent uppercase tracking-widest">{article.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-border-subtle"></span>
                <span className="text-xs text-muted-gray">{article.date}</span>
              </div>
              <h3 className="text-2xl font-bold text-primary-dark mb-4 tracking-tight group-hover:text-soft-accent transition-colors">{article.title}</h3>
              <p className="text-muted-gray leading-relaxed font-light mb-6">{article.excerpt}</p>
              <div className="flex items-center gap-2 text-primary-dark group-hover:text-soft-accent transition-colors">
                <span className="text-sm font-bold">اقرأ المزيد</span>
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);

    // Update page metadata dynamically
    const metadata: Record<Page, { title: string; description: string }> = {
      home: {
        title: `${BRAND_NAME} | إدارة أصول الملكية المؤجرة`,
        description: 'منظومة تشغيل موحدة تدير جميع عمليات العقار - التشغيل، الصيانة، والإدارة المالية'
      },
      about: {
        title: `من نحن | ${BRAND_NAME}`,
        description: 'نبني منظومة تشغيل متكاملة لإدارة العقارات طويلة الأمد بوضوح واستمرارية'
      },
      'how-it-works': {
        title: `طريقة العمل | ${BRAND_NAME}`,
        description: 'منهجية منظمة لإدارة عقارك بكفاءة وشفافية تامة'
      },
      pricing: {
        title: `الأسعار | ${BRAND_NAME}`,
        description: 'نموذج تسعير شفاف - ادفع فقط عند الطلب بدون التزام طويل الأمد'
      },
      faq: {
        title: `الأسئلة الشائعة | ${BRAND_NAME}`,
        description: 'إجابات على جميع أسئلتك حول نموذج إدارتنا الحديث والشفاف'
      },
      contact: {
        title: `تواصل معنا | ${BRAND_NAME}`,
        description: 'ابدأ تنظيم إدارة عقارك مع فريقنا المختص'
      },
      security: {
        title: `الأمان | ${BRAND_NAME}`,
        description: 'معايير أمان صارمة لحماية بياناتك وأموالك وأصولك العقارية'
      },
      legal: {
        title: `الخصوصية والشروط | ${BRAND_NAME}`,
        description: 'سياسة الخصوصية وشروط الخدمة - شفافية ووضوح في التعامل'
      },
      news: {
        title: `الأخبار | ${BRAND_NAME}`,
        description: 'آخر الأخبار والتطورات في عالم إدارة العقارات'
      }
    };

    const pageMetadata = metadata[currentPage];
    document.title = pageMetadata.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageMetadata.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageMetadata.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', pageMetadata.description);
    }

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', pageMetadata.title);
    }

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', pageMetadata.description);
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary-accent selection:text-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'how-it-works' && <HowItWorksPage setCurrentPage={setCurrentPage} />}
            {currentPage === 'pricing' && <PricingPage setCurrentPage={setCurrentPage} />}
            {currentPage === 'security' && <SecurityPage />}
            {currentPage === 'legal' && <LegalPage />}
            {currentPage === 'faq' && <FAQPage setCurrentPage={setCurrentPage} />}
            {currentPage === 'contact' && <ContactPage />}
            {currentPage === 'news' && <NewsPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
