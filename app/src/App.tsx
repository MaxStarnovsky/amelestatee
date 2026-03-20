import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ArrowRight, 
  ChevronDown, 
  Star, 
  Quote,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Menu,
  X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const buildingRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const logoMaskRef = useRef<HTMLDivElement>(null);
  const whyFindRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero scroll animation
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        }
      });

      // Fade out hero text
      heroTl.to(heroTextRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.3,
        ease: 'power2.inOut'
      }, 0);

      // Scale up building
      heroTl.to(buildingRef.current, {
        scale: 1.5,
        y: '-10%',
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0);

      // Show logo mask
      heroTl.fromTo(logoMaskRef.current, 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' },
        0.4
      );

      // Why FIND section animation
      gsap.fromTo('.why-find-text',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: whyFindRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Steps animation
      gsap.fromTo('.step-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Services cards animation
      gsap.fromTo('.service-item',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Parallax for images
      gsap.utils.toArray<HTMLElement>('.parallax-img').forEach((img) => {
        gsap.to(img, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      });

    }, heroRef);

    // Navigation visibility on scroll
    const handleScroll = () => {
      setNavVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        navVisible ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <span className={`text-2xl font-bold tracking-tighter transition-colors ${
                navVisible ? 'text-black' : 'text-black'
              }`}>
                AMEL
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className={`hidden lg:flex items-center gap-8 transition-colors ${
              navVisible ? 'text-black' : 'text-black'
            }`}>
              <button onClick={() => scrollToSection('search')} className="nav-link text-sm font-medium">Search</button>
              <button onClick={() => scrollToSection('agents')} className="nav-link text-sm font-medium">Agents</button>
              <button onClick={() => scrollToSection('join')} className="nav-link text-sm font-medium">Join</button>
              <button className="nav-link text-sm font-medium flex items-center gap-1">
                Paperwork <ChevronDown className="w-4 h-4" />
              </button>
              <button className="nav-link text-sm font-medium flex items-center gap-1">
                Resources <ChevronDown className="w-4 h-4" />
              </button>
              <button className="nav-link text-sm font-medium flex items-center gap-1">
                About <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Sign In Button */}
            <div className="hidden lg:block">
              <button className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                navVisible 
                  ? 'bg-black text-white hover:bg-gray-800' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}>
                Sign In
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-6 py-4 space-y-4">
              <button onClick={() => scrollToSection('search')} className="block w-full text-left text-sm font-medium py-2">Search</button>
              <button onClick={() => scrollToSection('agents')} className="block w-full text-left text-sm font-medium py-2">Agents</button>
              <button onClick={() => scrollToSection('join')} className="block w-full text-left text-sm font-medium py-2">Join</button>
              <button className="block w-full text-left text-sm font-medium py-2">Paperwork</button>
              <button className="block w-full text-left text-sm font-medium py-2">Resources</button>
              <button className="block w-full text-left text-sm font-medium py-2">About</button>
              <button className="w-full bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        {/* Cloud Background */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-100/50 via-white/30 to-white" />
        </div>

        {/* Hero Content */}
        <div ref={heroTextRef} className="relative z-10 flex flex-col items-center justify-center h-full pt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold text-center text-black tracking-tight">
            Find What Moves You
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 text-center max-w-2xl px-4">
            Expert agents. Real guidance. A clear path to find what's next.
          </p>
          <button className="mt-8 btn-primary flex items-center gap-2">
            Find Properties <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Building Image */}
        <div 
          ref={buildingRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4"
        >
          <img 
            src="/hero-building.jpg" 
            alt="Modern Building" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Logo Mask Overlay */}
        <div 
          ref={logoMaskRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
        >
          <div className="text-center">
            <h2 
              className="text-[20vw] font-bold leading-none"
              style={{
                backgroundImage: 'url(/hero-building.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AMEL
            </h2>
            <p className="text-2xl md:text-4xl font-light text-gray-400 mt-4">Real Estate Luxembourg</p>
          </div>
        </div>
      </section>

      {/* Why FIND Section */}
      <section ref={whyFindRef} id="why-find" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <span className="why-find-text text-sm font-medium text-gray-500 uppercase tracking-wider">Why AMEL</span>
            </div>
            <div>
              <h2 className="why-find-text text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-black">
                Your life's changing. Don't just find a place — find what's next. We help you move forward with clarity, confidence, and the right agent by your side.
              </h2>
            </div>
          </div>
          
          {/* NYC Video/Image */}
          <div className="mt-16 overflow-hidden rounded-lg">
            <img 
              src="/nyc-skyline.jpg" 
              alt="NYC Skyline" 
              className="parallax-img w-full h-[60vh] object-cover"
            />
          </div>
        </div>
      </section>

      {/* This Isn't Just About Real Estate Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-center mb-16">
            This isn't just about real estate.
          </h2>
          
          {/* Chevron Images */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-0 mb-16">
            <div className="relative w-64 h-80 clip-chevron overflow-hidden">
              <img 
                src="/agent-person.jpg" 
                alt="Professional Woman" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-64 h-80 clip-chevron overflow-hidden md:-ml-16">
              <img 
                src="/rent-image.jpg" 
                alt="Interior" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-64 h-80 clip-chevron overflow-hidden md:-ml-16">
              <img 
                src="/testimonial-couple.jpg" 
                alt="Couple" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <p className="text-center text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            It's about identity. Progress. Getting unstuck. You're not just looking for a place. You're looking for alignment. That's what we help you find.
          </p>
        </div>
      </section>

      {/* Real Estate, Rewired Section */}
      <section ref={stepsRef} className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8">
                Real Estate,<br />Rewired.
              </h2>
              <button className="btn-primary flex items-center gap-2">
                Start Your Search <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-8">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Steps:</span>
              
              <div className="step-item flex gap-6">
                <span className="text-sm font-medium text-gray-400">01</span>
                <div>
                  <h3 className="text-xl font-medium mb-2">Talk to a Real Human.</h3>
                  <p className="text-gray-600">We match you with an expert who actually listens.</p>
                </div>
              </div>
              
              <div className="step-item flex gap-6">
                <span className="text-sm font-medium text-gray-400">02</span>
                <div>
                  <h3 className="text-xl font-medium mb-2">Get Clarity.</h3>
                  <p className="text-gray-600">We define what you really need, not just what's available.</p>
                </div>
              </div>
              
              <div className="step-item flex gap-6">
                <span className="text-sm font-medium text-gray-400">03</span>
                <div>
                  <h3 className="text-xl font-medium mb-2">Move Forward.</h3>
                  <p className="text-gray-600">We find what fits — and make it happen.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Agents Section */}
      <section id="agents" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 block">For Agents</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-8">
                Don't Rent Your Career. Own It.
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="/agent-person.jpg" 
                alt="Agent" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <img 
                src="/aerial-houses.jpg" 
                alt="Aerial View" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
          
          <div className="mt-12 max-w-3xl">
            <p className="text-lg text-gray-600 mb-8">
              At AMEL, our agents don't just work for the brand—they own a part of it. We give top performers real equity, so they're invested in more than just your transaction—they're invested in your outcome.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Agents are certified, supported, and equipped to deliver five-star service—because their success is tied to yours. You're not just here to close deals — you're building a career, a life, a legacy. We help agents find the company that gives them the support, tools, and leadership to thrive.
            </p>
            <button className="btn-primary flex items-center gap-2">
              Join The Movement <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium mb-16">Don't Take Our Word for It</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img 
              src="/testimonial-couple.jpg" 
              alt="Happy Clients" 
              className="w-full h-96 object-cover rounded-lg"
            />
            
            <div className="relative">
              <Quote className="w-12 h-12 text-gray-300 mb-6" />
              
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button 
                    key={num}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      num === 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl font-medium mb-6">
                "Michael was a great realtor. Such a hard worker, dedicated to helping us find the perfect neighborhood, price point and home. He's a workaholic so he was available morning, noon and night. Tireless and dedicated. Would recommend him 100%!"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-500 uppercase">Bernadette Hogan</span>
                <span className="text-gray-300">/</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="search" className="py-24 lg:py-32 bg-black text-white">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4 block">Services</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-16">How AMEL<br />Can Help You</h2>
          
          {/* Buy */}
          <div className="service-item relative overflow-hidden rounded-2xl mb-6 group cursor-pointer">
            <div className="absolute inset-0">
              <img 
                src="/hero-building.jpg" 
                alt="Buy" 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              />
            </div>
            <div className="relative z-10 p-8 lg:p-12 flex items-center justify-between min-h-[200px]">
              <div className="flex items-center gap-8">
                <span className="text-sm font-medium text-gray-400">1</span>
                <div>
                  <h3 className="text-6xl md:text-8xl lg:text-9xl font-medium">Buy</h3>
                  <p className="text-gray-300 max-w-md mt-4">
                    Buy smarter with expert agents backed by mortgage, legal, and appraisal pros—dialed in to get you the best deal, fast. We've done this over 10,000 times and we know what wins.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-12 h-12 text-white group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
          
          {/* Sell */}
          <div className="service-item relative overflow-hidden rounded-2xl mb-6 group cursor-pointer">
            <div className="absolute inset-0">
              <img 
                src="/sell-image.jpg" 
                alt="Sell" 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              />
            </div>
            <div className="relative z-10 p-8 lg:p-12 flex items-center justify-between min-h-[200px]">
              <div className="flex items-center gap-8">
                <span className="text-sm font-medium text-gray-400">2</span>
                <div>
                  <h3 className="text-6xl md:text-8xl lg:text-9xl font-medium">Sell</h3>
                  <p className="text-gray-300 max-w-md mt-4">
                    Sell fast, sell high. Your listing gets pro staging, strategic pricing, constant open houses, and agents who never stop working until the right buyer signs.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-12 h-12 text-white group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
          
          {/* Rent */}
          <div className="service-item relative overflow-hidden rounded-2xl mb-12 group cursor-pointer">
            <div className="absolute inset-0">
              <img 
                src="/rent-image.jpg" 
                alt="Rent" 
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
              />
            </div>
            <div className="relative z-10 p-8 lg:p-12 flex items-center justify-between min-h-[200px]">
              <div className="flex items-center gap-8">
                <span className="text-sm font-medium text-gray-400">3</span>
                <div>
                  <h3 className="text-6xl md:text-8xl lg:text-9xl font-medium">Rent</h3>
                  <p className="text-gray-300 max-w-md mt-4">
                    Access hidden rentals before they hit the market through agents who know every landlord in town. With decades of NYC experience, we unlock the best deals you won't find online.
                  </p>
                </div>
              </div>
              <ArrowRight className="w-12 h-12 text-white group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl text-gray-300 mb-6">
              Our certified agents guide you through every stage of real estate with expert knowledge and reliable support.
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto">
              Get Started with AMEL <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Support Beyond Section */}
      <section className="py-24 lg:py-32 bg-black text-white">
        <div className="px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <h2 className="text-4xl md:text-5xl font-medium">
              Support Beyond Buying and Selling
            </h2>
            <div>
              <p className="text-gray-300 mb-6">
                The real estate market never stands still — and neither do we. Our experts offer continued support beyond the sale, helping you maximize your investment.
              </p>
              <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                Discover Our Services <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="service-card relative overflow-hidden rounded-2xl group cursor-pointer">
              <img 
                src="/mortgage-service.jpg" 
                alt="Mortgage Services" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-medium mb-2">Mortgage Services</h3>
                <button className="text-sm flex items-center gap-1 text-gray-300 group-hover:text-white transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="service-card relative overflow-hidden rounded-2xl group cursor-pointer">
              <img 
                src="/property-service.jpg" 
                alt="Property Management" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-medium mb-2">Property Management</h3>
                <p className="text-sm text-gray-300 mb-2">Let us handle the details so you enjoy the rewards.</p>
                <button className="text-sm flex items-center gap-1 text-gray-300 group-hover:text-white transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="service-card relative overflow-hidden rounded-2xl group cursor-pointer">
              <img 
                src="/construction-service.jpg" 
                alt="Construction" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-medium mb-2">Construction and Real Estate Development</h3>
                <button className="text-sm flex items-center gap-1 text-gray-300 group-hover:text-white transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Resources Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <h2 className="text-4xl md:text-5xl font-medium">
              Blog &<br />Resources
            </h2>
            <div>
              <p className="text-gray-600 mb-6">
                See how we've helped clients achieve their real estate dreams, one successful move at a time.
              </p>
              <button className="btn-primary flex items-center gap-2">
                Visit Our Blog <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Blog Posts */}
          <div className="space-y-8">
            <article className="grid lg:grid-cols-2 gap-8 items-center border-b pb-8">
              <div>
                <span className="text-sm text-gray-500 mb-2 block">2026-02-23</span>
                <h3 className="text-2xl font-medium mb-4">5 Cozy Ways to Spend a Snow Day at Home</h3>
                <p className="text-gray-600 mb-4">When the city slows down, lean in. Five cozy ways to make the most of a snow day in NYC.</p>
                <button className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <img 
                src="/blog-snow.jpg" 
                alt="Snow Day" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </article>
            
            <article className="grid lg:grid-cols-2 gap-8 items-center border-b pb-8">
              <div>
                <span className="text-sm text-gray-500 mb-2 block">2026-02-02</span>
                <h3 className="text-2xl font-medium mb-4">January 2026 NYC Market Update</h3>
                <p className="text-gray-600 mb-4">Inventory is up across NYC to start 2026. See how Manhattan, Brooklyn, and Queens are shaping up heading into spring.</p>
                <button className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <img 
                src="/nyc-skyline.jpg" 
                alt="NYC Market" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </article>
            
            <article className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-sm text-gray-500 mb-2 block">2026-01-02</span>
                <h3 className="text-2xl font-medium mb-4">CEO of Oxford Adam Mahfouda Comments About Breaking The Lease During The Coronavirus Pandemic</h3>
                <p className="text-gray-600 mb-4">What to do if you're locked into a lease you can no longer afford</p>
                <button className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="w-full h-64 bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-4xl font-bold text-white">FOX BUSINESS</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 lg:py-48">
        <div className="absolute inset-0">
          <img 
            src="/family-cta.jpg" 
            alt="Family" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 px-6 lg:px-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-8">
            Find You. We'll Help You Get There.
          </h2>
          <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto">
            Let's Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-12 mb-16">
            {/* Newsletter */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-medium mb-4">Subscribe to our Newsletter!</h3>
              <div className="flex gap-2 border-b border-gray-700 pb-2">
                <input 
                  type="email" 
                  placeholder="Enter address" 
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                />
                <button className="text-white hover:text-gray-300 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div>
                  <span className="text-xs text-gray-500 uppercase block mb-2">Head Office Luxembourg</span>
                  <p className="text-sm">12 Rue de la Poste,<br />L-2345 Luxembourg</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase block mb-2">Email Us</span>
                  <p className="text-sm">hello@amelrealestate.lu</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase block mb-2">Call Us</span>
                  <p className="text-sm">+352 22 99 55 00</p>
                </div>
              </div>
            </div>
            
            {/* Links */}
            <div>
              <nav className="space-y-3">
                <a href="#" className="block text-lg hover:text-gray-300 transition-colors">Search</a>
                <a href="#" className="block text-lg hover:text-gray-300 transition-colors">Agents</a>
                <a href="#" className="block text-lg hover:text-gray-300 transition-colors">Join</a>
                <a href="#" className="block text-lg hover:text-gray-300 transition-colors">About Us</a>
                <a href="#" className="block text-lg hover:text-gray-300 transition-colors">Agent Portal</a>
              </nav>
            </div>
            
            {/* Social */}
            <div>
              <nav className="space-y-3">
                <a href="#" className="block text-lg hover:text-gray-300 transition-colors flex items-center gap-2">
                  <Facebook className="w-5 h-5" /> Facebook
                </a>
                <a href="#" className="block text-lg hover:text-gray-300 transition-colors flex items-center gap-2">
                  <Instagram className="w-5 h-5" /> Instagram
                </a>
                <a href="#" className="block text-lg hover:text-gray-300 transition-colors flex items-center gap-2">
                  <Youtube className="w-5 h-5" /> Youtube
                </a>
                <a href="#" className="block text-lg hover:text-gray-300 transition-colors flex items-center gap-2">
                  <Linkedin className="w-5 h-5" /> Linkedin
                </a>
              </nav>
            </div>
          </div>
          
          {/* Big Logo */}
          <div className="text-center mb-8">
            <span className="text-[20vw] font-bold leading-none tracking-tighter">AMEL</span>
          </div>
          
          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-white transition-colors">Fair Housing Notice</a>
            <a href="#" className="hover:text-white transition-colors">Operating Procedure</a>
            <a href="#" className="hover:text-white transition-colors">Press</a>
            <a href="#" className="hover:text-white transition-colors">Housing Choice Vouchers Welcome</a>
            <span>AMEL Real Estate Luxembourg</span>
            <span>Copyright © 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
