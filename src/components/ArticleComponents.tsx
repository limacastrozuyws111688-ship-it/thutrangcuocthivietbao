import React, { useState, useEffect } from 'react';
import { 
  Clock, Facebook, Twitter, Link2, 
  PlayCircle, Search, ChevronUp, UserX, AlertTriangle, ShieldCheck, Volume2, X
} from 'lucide-react';
import { ARTICLE_DATA } from '../constants';
import SpeechButton from './SpeechButton';

export const Header = () => (
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-50 shadow-sm transition-all duration-300">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-1 font-black text-xl md:text-2xl tracking-tighter font-sans uppercase">
        <span className="text-[#4285F4]">T</span>
        <span className="text-[#EA4335]">á</span>
        <span className="text-[#FBBC05]">c</span>
        <span className="text-[#4285F4] ml-1">p</span>
        <span className="text-[#34A853]">h</span>
        <span className="text-[#EA4335]">ẩ</span>
        <span className="text-[#4285F4]">m</span>
        <span className="ml-2 text-slate-400 font-light text-sm hidden sm:inline">Dự thi 2026</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600 uppercase tracking-wider">
        <a href="#" className="hover:text-[#34A853] transition-colors">Trang chủ</a>
        <a href="#" className="text-[#34A853] border-b-2 border-[#34A853] pb-1">Tác phẩm</a>
        <a href="#" className="hover:text-[#34A853] transition-colors">Góc nhìn & Phân tích</a>
        <a href="#" className="hover:text-[#34A853] transition-colors flex items-center gap-1">Trải nghiệm <span className="text-red-500 text-lg leading-none">🔥</span></a>
      </div>
    </div>
  </header>
);

export const HeroSection = () => (
  <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-white overflow-hidden py-24">
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-t from-green-50/50 via-white to-white z-10"></div>
      <div className="w-full h-full bg-green-50/20 flex items-center justify-center">
         <div className="text-green-300 flex flex-col items-center opacity-20">
            <svg className="w-48 h-48 mb-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span className="tracking-widest uppercase font-black text-xs">[ SỰ THẬT & CÔNG LÝ ]</span>
         </div>
      </div>
    </div>

    <div className="relative z-20 max-w-5xl mx-auto px-6 w-full text-center md:text-left mt-8">
      <span className="inline-block py-2 px-6 bg-[#34A853]/10 text-[#34A853] font-black uppercase tracking-[0.3em] text-[10px] mb-8 rounded-full border border-[#34A853]/20">
        {ARTICLE_DATA.category}
      </span>
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-black font-sans text-slate-950 leading-[1.1] mb-12 p-8 md:p-14 border-[16px] border-[#EA4335] rounded-[3.5rem] bg-white shadow-[0_50px_130px_rgba(234,67,53,0.1)] inline-block w-full md:w-auto relative">
        TIN GIẢ TRÊN <br className="hidden md:block"/>
        KHÔNG GIAN MẠNG <br className="hidden md:block"/>
        NHẬN DIỆN & PHẢN BÁC
      </h1>
      <p className="text-lg md:text-2xl text-slate-600 font-sans max-w-3xl leading-relaxed mb-12 border-l-8 border-[#34A853] pl-6 text-left">
        {ARTICLE_DATA.sapo}
      </p>
      
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-slate-500 text-sm font-black uppercase tracking-wider">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#4285F4] text-white flex items-center justify-center font-black shadow-2xl shadow-blue-200">
            {ARTICLE_DATA.authorShort}
          </div>
          <div>
            <span className="text-slate-900 font-black text-xl block mb-0.5">{ARTICLE_DATA.author}</span>
            <span className="text-[10px] text-slate-400">Tác giả bài viết</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
          <Clock className="w-5 h-5 text-[#FBBC05]" />
          <span>{ARTICLE_DATA.date}</span>
        </div>
      </div>
    </div>
  </section>
);

export const SectionHeading = ({ children, id, textToRead }: { children: React.ReactNode, id: string, textToRead?: string }) => {
  const contentText = textToRead || (typeof children === 'string' ? children : '');
  return (
    <h2 id={id} className="text-3xl md:text-5xl font-black text-slate-900 font-sans leading-tight mt-24 mb-12 pb-6 border-b-8 border-slate-50 flex items-center justify-between scroll-mt-24">
      <div className="flex items-center">
        <span className="w-4 h-12 bg-[#34A853] mr-6 rounded-full block shadow-lg shadow-green-200"></span>
        {children}
      </div>
      {contentText && <SpeechButton text={contentText} className="ml-4" />}
    </h2>
  );
};

export const QuoteBlock = ({ text, author }: { text: string, author?: string }) => (
  <blockquote className="my-20 px-10 py-12 bg-green-50/30 border-l-[12px] border-[#34A853] relative shadow-2xl shadow-green-900/5 rounded-r-[2rem] overflow-hidden group">
    <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none group-hover:rotate-12 transition-transform">
       <Volume2 className="w-48 h-48 text-[#34A853] -rotate-12" />
    </div>
    <div className="relative z-10">
      <p className="text-2xl md:text-3xl font-sans text-slate-800 leading-relaxed font-bold italic pr-12">
        “{text}”
      </p>
      <div className="absolute top-0 right-0">
        <SpeechButton text={text} className="shadow-none border-none bg-transparent hover:bg-green-100/50" />
      </div>
    </div>
    {author && (
      <footer className="mt-8 text-[11px] font-black text-[#34A853] uppercase tracking-[0.3em] relative z-10 flex items-center gap-4">
        <span className="w-10 h-px bg-[#34A853]/30"></span> {author}
      </footer>
    )}
  </blockquote>
);

export const ReadableText = ({ children, textToRead }: { children: React.ReactNode, textToRead?: string }) => {
  const contentText = textToRead || (typeof children === 'string' ? children : '');
  
  return (
    <div className="group relative">
      {contentText && (
        <>
          <div className="absolute -left-12 top-2 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
            <SpeechButton text={contentText} />
          </div>
          <div className="lg:hidden flex justify-end mb-1">
            <SpeechButton text={contentText} className="w-8 h-8" />
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export const InteractiveGallery = ({ images, caption }: { images: string[], caption?: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    setImageLoaded(false);
    setErrorCount(0);
  }, [currentIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const toggleZoom = () => setIsZoomed(!isZoomed);

  const getImageUrl = (url: string) => {
    if (!url) return '';
    
    let id = '';
    if (url.includes('drive.google.com')) {
      const idMatch = url.match(/id=([^&]+)/) || url.match(/\/d\/([^/]+)/);
      if (idMatch) id = idMatch[1];
    } else if (url.length > 20 && !url.includes('http')) {
      id = url;
    } else {
      return url;
    }

    if (id) {
      // Use the standard UC endpoint which is often best for these specific Google IDs
      return `https://drive.google.com/uc?id=${id}`;
    }
    return url;
  };

  const onImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    // Fallback to the usercontent endpoint if UC fails
    if (target.src.includes('drive.google.com/uc')) {
      const idMatch = target.src.match(/id=([^&]+)/);
      if (idMatch) {
         target.src = `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
         return;
      }
    }
    setImageLoaded(true);
    setErrorCount(prev => prev + 1);
  };

  return (
    <>
      <figure className="my-14 w-full">
        <div 
          className="relative min-h-[500px] md:min-h-[700px] bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.06)] transition-all flex flex-col"
        >
          {/* Top Badge Overlay */}
          <div className="absolute top-8 left-8 z-10">
            <div className="bg-[#1a4da1] text-white px-6 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-2xl flex items-center gap-3 border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] shadow-[0_0_10px_rgba(251,188,5,0.8)]"></span>
              Chuyên đề: Tin giả & Sự thật
            </div>
          </div>

          {/* Main Image View */}
          <div 
            onClick={toggleZoom}
            className="flex-grow w-full relative flex items-center justify-center cursor-zoom-in bg-slate-50/50 overflow-hidden"
          >
            {errorCount > 0 ? (
              <div className="text-center p-12 bg-white rounded-[3rem] border-4 border-dashed border-slate-50 max-w-lg shadow-inner animate-in fade-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <AlertTriangle className="w-12 h-12 text-[#EA4335]" />
                </div>
                <h4 className="font-black text-slate-900 uppercase tracking-[0.2em] text-lg mb-3">KHÔNG THỂ TẢI HÌNH ẢNH</h4>
                <p className="text-slate-400 text-sm mb-10 leading-relaxed font-medium">Bảo mật của trình duyệt hoặc chính sách Google Drive đang ngăn chặn hiển thị trực tiếp. Bạn có thể mở ảnh gốc trong tab mới để xem đầy đủ.</p>
                
                <div className="flex flex-col gap-4">
                  <a 
                    href={images[currentIndex]} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#4285F4] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#3367d6] transition-all shadow-2xl shadow-blue-300 hover:-translate-y-1"
                  >
                    MỞ TRONG TAB MỚI <ChevronUp className="w-5 h-5 rotate-90" />
                  </a>
                  
                  <button 
                    onClick={() => { setErrorCount(0); setImageLoaded(false); }}
                    className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#EA4335] transition-all mt-4 underline underline-offset-8"
                  >
                    THỬ TẢI LẠI TRANG
                  </button>
                </div>
              </div>
            ) : (
              <img 
                key={currentIndex}
                src={getImageUrl(images[currentIndex])} 
                alt={`Infographic ${currentIndex + 1}`}
                onLoad={() => setImageLoaded(true)}
                onError={onImageError}
                className={`max-w-full max-h-[85vh] object-contain transition-all duration-1000 ease-out pointer-events-none ${imageLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-110 blur-3xl'}`}
                referrerPolicy="no-referrer"
              />
            )}
          </div>
          
          {/* Controls Bar */}
          <div className="bg-white/80 backdrop-blur-3xl border-t border-slate-50 p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-3 bg-[#e8f0fe] text-[#1967d2] px-6 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-full w-fit shadow-sm">
                Trang {currentIndex + 1} / {images.length}
              </span>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest ml-1">Click vào ảnh để phóng to xem chi tiết</p>
            </div>
            
            <div className="flex items-center gap-8">
              {/* Google Brand Dots */}
              <div className="flex gap-4">
                {images.map((_, i) => {
                  const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
                  const color = colors[i % colors.length];
                  return (
                    <button 
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
                      className={`h-2.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-12 shadow-xl' : 'w-2.5 opacity-20 hover:opacity-50'}`}
                      style={{ backgroundColor: i === currentIndex ? color : '#94a3b8', boxShadow: i === currentIndex ? `0 10px 20px ${color}40` : 'none' }}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={handlePrev}
                  className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100 active:scale-90"
                  aria-label="Previous"
                >
                  <ChevronUp className="w-7 h-7 -rotate-90" />
                </button>
                <button 
                  onClick={handleNext}
                  className="w-14 h-14 rounded-2xl bg-[#4285F4] text-white flex items-center justify-center hover:bg-[#3367d6] transition-all shadow-2xl shadow-blue-900/20 active:scale-95"
                  aria-label="Next"
                >
                  <ChevronUp className="w-7 h-7 rotate-90" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {caption && (
          <figcaption className="text-base text-slate-400 mt-10 font-sans font-medium text-center max-w-4xl mx-auto px-6 italic leading-relaxed border-t border-slate-50 pt-6">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox / Zoom Portal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-[50px] flex flex-col items-center justify-center p-6 md:p-12 animate-in fade-in duration-500"
          onClick={toggleZoom}
        >
          <button 
            className="fixed top-8 right-8 z-[110] text-slate-900 bg-white hover:bg-slate-50 p-5 rounded-[2rem] transition-all hover:rotate-90 shadow-2xl border border-slate-100 flex items-center justify-center group"
            onClick={toggleZoom}
          >
             <X className="w-8 h-8 transition-transform group-hover:scale-110" />
             <span className="sr-only">Đóng</span>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center">
             <img 
               src={getImageUrl(images[currentIndex])} 
               alt="Zoomed view" 
               className="max-w-full max-h-full object-contain shadow-[0_80px_200px_rgba(0,0,0,0.12)] animate-in zoom-in-95 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] p-4 bg-white rounded-3xl"
               referrerPolicy="no-referrer"
             />
          </div>
          
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[110] text-slate-900 text-[11px] font-black bg-white/50 backdrop-blur-3xl px-12 py-5 rounded-full border border-white/20 shadow-[0_40px_100px_rgba(0,0,0,0.1)] flex items-center gap-8 animate-in slide-in-from-bottom-10 duration-700">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#4285F4]"></span>
              <span className="w-3 h-3 rounded-full bg-[#EA4335]"></span>
              <span className="w-3 h-3 rounded-full bg-[#FBBC05]"></span>
              <span className="w-3 h-3 rounded-full bg-[#34A853]"></span>
            </div>
            <span className="uppercase tracking-[0.3em] text-[#4285F4]">Chế độ phóng đại</span>
            <span className="w-px h-8 bg-slate-200"></span>
            <span className="uppercase tracking-widest text-slate-400">Click bất kỳ để thoát</span>
          </div>
        </div>
      )}
    </>
  );
};

export const MediaPlaceholder = ({ type = "image", caption, height = "h-[450px]", videoUrl, imageUrl }: { type?: "image" | "video" | "infographic", caption?: string, height?: string, videoUrl?: string, imageUrl?: string }) => {
  const isVideo = type === "video";
  const isInfo = type === "infographic";
  
  return (
    <figure className="my-12 w-full">
      <div className={`w-full ${height} bg-slate-50 flex flex-col items-center justify-center border-2 border-slate-100 rounded-3xl relative group overflow-hidden shadow-xl shadow-slate-200/50`}>
        {isVideo && videoUrl ? (
          <iframe
            src={videoUrl}
            className="w-full h-full border-none"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : isVideo ? (
          <div className="absolute inset-0 bg-slate-900 flex items-center justify-center cursor-pointer hover:bg-black transition-colors">
             <PlayCircle className="w-24 h-24 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
             <span className="absolute bottom-6 left-6 text-white text-[10px] font-black uppercase tracking-[0.2em] bg-[#4285F4] px-4 py-2 rounded-full border border-white/20 shadow-2xl">Video Phóng sự</span>
          </div>
        ) : imageUrl ? (
          <img src={imageUrl} alt={caption} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        ) : (
          <>
            <div className="absolute inset-0 bg-stripes opacity-5"></div>
            <svg className="w-20 h-20 text-slate-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isInfo ? "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" : "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"} /></svg>
            <span className="text-slate-300 font-black uppercase tracking-[0.2em] text-xs">
              [ {isInfo ? "CHÈN INFOGRAPHIC TẠI ĐÂY" : "CHÈN ẢNH MINH HỌA"} ]
            </span>
          </>
        )}
      </div>
      {caption && (
        <figcaption className="text-sm text-slate-500 mt-6 font-sans font-medium text-center max-w-3xl mx-auto px-6 italic leading-relaxed border-t border-slate-100 pt-4 border-dashed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export const StickyTOC = () => {
  const [activeId, setActiveId] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2[id]');
      let currentActive = '';
      headings.forEach(heading => {
        const top = heading.getBoundingClientRect().top;
        if (top >= 0 && top <= 300) {
          currentActive = heading.id;
        }
      });
      if (currentActive) setActiveId(currentActive);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'thuc-trang', text: '1. \"Virus\" vô hình, hậu quả hữu hình' },
    { id: 'thu-doan', text: '2. Nhận diện thủ đoạn \"bình cũ, rượu mới\"' },
    { id: '5-dau-hieu', text: '3. 5 Dấu hiệu nhận diện tin giả' },
    { id: 'phan-bac', text: '4. Phản bác: Không chỉ là nút \"Xóa bài\"' },
    { id: 'giai-phap', text: '5. Giải pháp và Khuyến nghị' },
  ];

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sticky top-24 bg-green-50/50 p-6 rounded-2xl border border-green-100 shadow-sm backdrop-blur-sm">
      <h3 className="font-bold text-green-950 uppercase tracking-wider text-xs mb-4 border-b border-green-200 pb-2 flex items-center justify-between">
        Mục lục
        <Clock className="w-3 h-3 text-green-600" />
      </h3>
      <nav className="flex flex-col gap-3">
        {links.map(link => (
          <a 
            key={link.id} 
            href={`#${link.id}`}
            className={`text-sm leading-relaxed transition-all border-l-2 pl-3 py-1 ${activeId === link.id ? 'text-[#34A853] border-[#34A853] font-black translate-x-1' : 'text-slate-500 border-transparent hover:text-green-700 hover:border-green-300'}`}
          >
            {link.text}
          </a>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-green-100">
        <h3 className="font-bold text-green-900 uppercase tracking-wider text-[10px] mb-4">Chia sẻ bài viết</h3>
        <div className="flex gap-3">
          <button 
            onClick={shareOnFacebook}
            className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-all shadow-sm active:scale-90" 
            title="Facebook"
          >
            <Facebook className="w-5 h-5" />
          </button>
          <button 
            onClick={shareOnTwitter}
            className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm active:scale-90" 
            title="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </button>
          <button 
            onClick={copyLink}
            className={`w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center transition-all shadow-sm active:scale-90 relative ${copied ? 'text-green-600 border-green-200 bg-green-50' : 'text-slate-600 hover:bg-slate-900 hover:text-white'}`} 
            title="Copy Link"
          >
            {copied ? <ShieldCheck className="w-5 h-5" /> : <Link2 className="w-5 h-5" />}
            {copied && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-3 rounded shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
                Đã sao chép!
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
