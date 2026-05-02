import { 
  ChevronUp, AlertTriangle, ShieldCheck, Search, UserX
} from 'lucide-react';
import { motion } from 'motion/react';
import { ARTICLE_DATA } from './constants';
import { 
  Header, HeroSection, SectionHeading, QuoteBlock, 
  MediaPlaceholder, StickyTOC, ReadableText, InteractiveGallery
} from './components/ArticleComponents';
import InteractiveQuiz from './components/InteractiveQuiz';

export default function App() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-[#f1fcf4] font-sans text-slate-800 selection:bg-[#34A853]/20 selection:text-[#34A853] scroll-smooth overflow-x-hidden">
      <Header />
      <HeroSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 relative z-10">
        {/* Decorative Floating Elements */}
        <div className="absolute top-20 right-[-10%] w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-[-10%] w-80 h-80 bg-red-50/50 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-40 right-[-5%] w-72 h-72 bg-yellow-50/50 rounded-full blur-3xl -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start transition-all duration-500">
            <StickyTOC />
          </aside>

          <article className="lg:col-span-8 lg:col-start-4 text-lg text-slate-800 leading-[1.9] bg-white p-8 md:p-20 rounded-[4.5rem] shadow-[0_60px_160px_-40px_rgba(52,168,83,0.15)] border-4 border-slate-50 relative">
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#EA4335] rounded-full opacity-5 blur-2xl"></div>
            <div className="absolute top-1/3 -right-12 w-24 h-24 bg-[#4285F4] rounded-full opacity-5 blur-2xl"></div>
            <div className="absolute -bottom-10 left-1/2 w-32 h-32 bg-[#34A853] rounded-full opacity-5 blur-2xl"></div>
            
            <ReadableText textToRead="Mạng xã hội đã định hình lại cách chúng ta tiếp nhận thông tin. Bên cạnh những giá trị kết nối vô tiền khoáng hậu, nó vô tình trở thành vườn ươm lý tưởng cho nấm độc tin giả. Những luận điệu xuyên tạc, thù địch không còn nằm trên những tờ truyền đơn in lậu, mà chúng len lỏi qua từng cú lướt màn hình.">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-sans text-slate-900 leading-relaxed mb-10 first-letter:float-left first-letter:text-8xl first-letter:pr-4 first-letter:font-black first-letter:text-[#EA4335] first-letter:leading-[0.75] first-line:uppercase first-line:tracking-widest first-line:font-bold"
              >
                Mạng xã hội đã định hình lại cách chúng ta tiếp nhận thông tin. Bên cạnh những giá trị kết nối vô tiền khoáng hậu, nó vô tình trở thành \"vườn ươm\" lý tưởng cho nấm độc tin giả (fake news). Những luận điệu xuyên tạc, thù địch không còn nằm trên những tờ truyền đơn in lậu, mà chúng len lỏi qua từng cú lướt màn hình.
              </motion.p>
            </ReadableText>

            <SectionHeading id="thuc-trang" textToRead="Virus vô hình, hậu quả hữu hình. 1. Thực trạng tin giả hiện nay.">\"Virus\" vô hình, hậu quả hữu hình</SectionHeading>
            
            <ReadableText textToRead="Tin giả không đơn thuần là một câu nói dối vô hại. Ở cấp độ vĩ mô, nó là công cụ của các chiến dịch phá hoại tư tưởng, nhằm gây xói mòn niềm tin của nhân dân vào thể chế, vào sự lãnh đạo của Đảng và sự quản lý của Nhà nước.">
              <p className="mb-6">
                Tin giả không đơn thuần là một câu nói dối vô hại. Ở cấp độ vĩ mô, nó là công cụ của các chiến dịch phá hoại tư tưởng, nhằm gây xói mòn niềm tin của nhân dân vào thể chế, vào sự lãnh đạo của Đảng và sự quản lý của Nhà nước.
              </p>
            </ReadableText>
            
            <ReadableText textToRead="Chiến thuật của các thế lực thù địch ngày càng tinh vi. Chúng không bịa ra 100% câu chuyện. Thủ đoạn nguy hiểm nhất là trộn lẫn 70% sự thật với 30% dối trá. Một văn bản thật bị cắt xén ngữ cảnh; một hình ảnh cũ được gắn cho một sự kiện mới; một quyết sách kinh tế bị bóp méo thành thuyết âm mưu chính trị.">
              <p className="mb-6">
                Chiến thuật của các thế lực thù địch ngày càng tinh vi. Chúng không \"bịa\" ra 100% câu chuyện. Thủ đoạn nguy hiểm nhất là <strong>trộn lẫn 70% sự thật với 30% dối trá</strong>. Một văn bản thật bị cắt xén ngữ cảnh; một hình ảnh cũ được gắn cho một sự kiện mới; một quyết sách kinh tế bị bóp méo thành thuyết âm mưu chính trị.
              </p>
            </ReadableText>

            <MediaPlaceholder 
              type="video" 
              videoUrl="https://drive.google.com/file/d/1GC7HyHvn6mP4yrUHWG3nu0N3uvz5_HpP/preview"
              caption="Video: VTV - Lật tẩy những thủ đoạn cắt ghép hình ảnh nhằm chống phá chính quyền trên nền tảng mạng xã hội xuyên biên giới."
            />

            <ReadableText textToRead="Sự nguy hiểm nằm ở tốc độ. Các thuật toán mạng xã hội ưu tiên hiển thị những nội dung giật gân, gây tranh cãi. Chỉ với một cú click Share, một thông tin độc hại đã có thể tiếp cận hàng triệu người trong vài giờ, gây hoang mang dư luận.">
              <p className="mb-6">
                Sự nguy hiểm nằm ở tốc độ. Các thuật toán mạng xã hội ưu tiên hiển thị những nội dung giật gân, gây tranh cãi. Chỉ với một cú click \"Share\", một thông tin độc hại đã có thể tiếp cận hàng triệu người trong vài giờ, gây hoang mang dư luận.
              </p>
            </ReadableText>

            <SectionHeading id="thu-doan" textToRead="Nhận diện thủ đoạn bình cũ rượu mới. Phần 2.">Nhận diện thủ đoạn \"bình cũ, rượu mới\"</SectionHeading>
            
            <ReadableText textToRead="Trong bối cảnh công nghệ AI bùng nổ, ranh giới giữa thật và giả càng trở nên mong manh. Các thế lực thù địch không ngừng thay đổi phương thức hoạt động để qua mặt các công cụ rà quét của cơ quan chức năng.">
              <p className="mb-6">
                Trong bối cảnh công nghệ AI bùng nổ, ranh giới giữa thật và giả càng trở nên mong manh. Các thế lực thù địch không ngừng thay đổi phương thức hoạt động để qua mặt các công cụ rà quét của cơ quan chức năng.
              </p>
            </ReadableText>

            <QuoteBlock 
              text="Tin giả đi vào nhận thức con người thông qua cảm xúc, đặc biệt là sự phẫn nộ và sợ hãi. Khi cảm xúc lên ngôi, tư duy phản biện thường bị tắt nghẽn. Đó là 'tử huyệt' mà các đối tượng lợi dụng."
              author="Phân tích từ Chuyên gia An ninh mạng Quốc gia"
            />

            <InteractiveGallery 
              images={[
                'https://drive.google.com/uc?id=1ZdpTYFRUti3VWesMG4jrRdT_IY7NTFQr',
                'https://drive.google.com/uc?id=1ZoKfKzJ51TXDuEmF8-q1YQBvu3Lyrd9V',
                'https://drive.google.com/uc?id=1t8rjIhkTY0ePNaqNBHyFjn_GzJkCEGFY',
                'https://drive.google.com/uc?id=1xs2HYFAbGk5IRk-AjaZ7v8eZnWTx01Tm'
              ]}
              caption="Chuỗi Infographic: Cơ chế hoạt động của tin giả và sự khác biệt đối với dòng thông tin chính thống (Click vào hình để xem trang chi tiết)."
            />

            <div id="5-dau-hieu" className="my-16 bg-[#fffbea] text-slate-800 p-8 md:p-12 rounded-[3rem] shadow-[0_30px_100px_rgba(251,188,5,0.1)] relative scroll-mt-24 border-2 border-yellow-100 overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
                 <AlertTriangle className="w-48 h-48 text-[#FBBC05]" />
              </div>
              <h3 className="text-2xl md:text-4xl font-black font-sans text-slate-900 mb-10 border-b-4 border-[#34A853] pb-6 uppercase tracking-wider inline-block">
                5 Dấu hiệu <span className="text-[#EA4335]">nhận diện</span> tin giả
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#4285F4] flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-blue-200 group-hover:scale-110 transition-transform">1</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">Nguồn tin không rõ ràng</h4>
                    <p className="text-base text-slate-500 leading-relaxed">Trang web nhái tên báo lớn, bài đăng từ tài khoản vô danh, mới lập, không có thông tin xác thực.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#EA4335] flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-red-200 group-hover:scale-110 transition-transform">2</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">Tiêu đề "giật tít", kích động</h4>
                    <p className="text-base text-slate-500 leading-relaxed">Sử dụng quá nhiều dấu chấm than, từ ngữ gây sốc, kêu gọi chia sẻ gấp nhằm đánh vào tâm lý.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#FBBC05] flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-yellow-200 group-hover:scale-110 transition-transform">3</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">Hình ảnh sai ngữ cảnh</h4>
                    <p className="text-base text-slate-500 leading-relaxed">Sử dụng ảnh của sự kiện cũ, ở quốc gia khác để gán ghép cho một sự việc hiện tại.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#34A853] flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-green-200 group-hover:scale-110 transition-transform">4</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">Không có dẫn chứng</h4>
                    <p className="text-base text-slate-500 leading-relaxed">Thường dùng các cụm từ mập mờ "một nguồn tin cho hay" mà không có cơ quan xác nhận.</p>
                  </div>
                </div>
                <div className="flex items-start gap-6 md:col-span-2 md:w-3/5 md:mx-auto group bg-white/60 p-6 rounded-3xl border border-white/20">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white text-[#EA4335] flex items-center justify-center font-black text-2xl border-2 border-[#EA4335]/10 shadow-lg group-hover:rotate-12 transition-transform">5</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2 text-slate-900">Phát tán bởi bot</h4>
                    <p className="text-base text-slate-500 leading-relaxed">Bài viết nhận được ngàn lượt like, share chỉ trong thời gian ngắn từ các tài khoản ảo.</p>
                  </div>
                </div>
              </div>
            </div>


            <SectionHeading id="phan-bac" textToRead="Phản bác không chỉ là nút Xóa bài. Phần 4.">Phản bác: Không chỉ là nút \"Xóa bài\"</SectionHeading>

            <ReadableText textToRead="Đấu tranh với luận điệu xuyên tạc không thể chỉ dừng lại ở việc gỡ bỏ nội dung vi phạm hay xử phạt hành chính các cá nhân tung tin đồn. Trận địa thông tin đòi hỏi sự chủ động.">
              <p className="mb-6">
                Đấu tranh với luận điệu xuyên tạc không thể chỉ dừng lại ở việc gỡ bỏ nội dung vi phạm hay xử phạt hành chính các cá nhân tung tin đồn. Trận địa thông tin đòi hỏi sự chủ động. 
              </p>
            </ReadableText>
            
            <ReadableText textToRead="Phản bác hiệu quả nhất chính là sự minh bạch và kịp thời của thông tin chính thống. Báo chí cách mạng và các cơ quan ngôn luận phải là người đi đầu, cung cấp thông tin chuẩn xác, đa chiều ngay từ phút đầu tiên. Lấy cái đẹp dẹp cái xấu, lấy thông tin tích cực để đẩy lùi thông tin tiêu cực. Sự thật được bảo vệ bằng những luận cứ khoa học, thực tiễn và sắc bén chính là vũ khí mạnh nhất.">
              <p className="mb-6">
                Phản bác hiệu quả nhất chính là <strong>sự minh bạch và kịp thời của thông tin chính thống</strong>. Báo chí cách mạng và các cơ quan ngôn luận phải là người đi đầu, cung cấp thông tin chuẩn xác, đa chiều ngay từ \"phút đầu tiên\". Lấy cái đẹp dẹp cái xấu, lấy thông tin tích cực để đẩy lùi thông tin tiêu cực. Sự thật được bảo vệ bằng những luận cứ khoa học, thực tiễn và sắc bén chính là vũ khí mạnh nhất.
              </p>
            </ReadableText>

            <SectionHeading id="giai-phap" textToRead="Giải pháp và Khuyến nghị. Phần 5.">Giải pháp và Khuyến nghị</SectionHeading>
            
            <div className="my-16 bg-[#f0f9ff] border border-blue-100 border-l-8 border-l-blue-600 p-8 md:p-10 shadow-sm rounded-r-lg scroll-mt-24">
              <h3 className="text-2xl font-black font-sans text-blue-950 mb-6 uppercase tracking-wide">
                Giải pháp và Khuyến nghị
              </h3>
              <p className="text-slate-600 italic mb-8">Để xây dựng một không gian mạng an toàn, lành mạnh, cần sự vào cuộc đồng bộ từ nhiều phía:</p>
              
              <ReadableText textToRead="Về phía mỗi công dân số: Trang bị vắc-xin số bằng cách hình thành thói quen kiểm chứng chéo nguồn tin, tư duy phản biện. Thực hiện quy tắc: Chậm lại một nhịp trước khi chia sẻ.">
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <ShieldCheck className="flex-shrink-0 w-7 h-7 text-blue-700 mt-0.5" />
                    <div>
                      <strong className="text-blue-950 block text-lg">Về phía cơ quan quản lý:</strong>
                      <span className="text-blue-900 leading-relaxed">Hoàn thiện hành lang pháp lý, tăng chế tài xử phạt đủ sức răn đe. Yêu cầu các nền tảng xuyên biên giới (Facebook, YouTube, TikTok) tuân thủ nghiêm túc pháp luật Việt Nam.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Search className="flex-shrink-0 w-7 h-7 text-blue-700 mt-0.5" />
                    <div>
                      <strong className="text-blue-950 block text-lg">Về phía báo chí chính thống:</strong>
                      <span className="text-blue-900 leading-relaxed">Nâng cao tính chiến đấu, tính thuyết phục trong các bài viết phản bác. Xây dựng các chuyên trang, chuyên mục \"Kiểm chứng thông tin\" (Fact-check).</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <UserX className="flex-shrink-0 w-7 h-7 text-blue-700 mt-0.5" />
                    <div>
                      <strong className="text-blue-950 block text-lg">Về phía mỗi công dân số:</strong>
                      <span className="text-blue-900 leading-relaxed">Trang bị \"vắc-xin số\" bằng cách hình thành thói quen kiểm chứng chéo nguồn tin, tư duy phản biện. Thực hiện quy tắc: <strong>\"Chậm lại một nhịp trước khi chia sẻ\"</strong>.</span>
                    </div>
                  </li>
                </ul>
              </ReadableText>
            </div>

            <InteractiveQuiz />

            <p className="mb-6 font-medium text-red-900 italic text-center mt-12 bg-red-50 py-6 px-4 rounded-lg">
              Không gian mạng là ảo, nhưng hậu quả là thật. Nhận diện và đập tan tin giả là cách mỗi chúng ta bảo vệ sự thật và xây dựng khối đại đoàn kết toàn dân tộc vững chắc.
            </p>

            <div className="mt-16 pt-8 border-t border-red-100 text-right">
               <p className="text-lg font-black font-serif text-red-950 uppercase">{ARTICLE_DATA.author}</p>
            </div>

          </article>
        </div>
      </main>

      <footer className="bg-white text-slate-600 mt-20 py-20 border-t-[12px] border-[#34A853]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center md:items-start gap-12 text-center md:text-left">
          
          <div className="max-w-md lg:max-w-xl">
            <h2 className="font-black text-2xl text-slate-900 font-sans uppercase mb-6 tracking-wide leading-tight">
              Giải Báo chí về <span className="text-[#EA4335]">công tác bảo vệ</span> nền tảng tư tưởng của Đảng năm 2026.
            </h2>
            <p className="text-base text-slate-500 leading-relaxed mb-6 font-medium">
              Bản quyền tác phẩm thuộc về tác giả. Việc sao chép, trích dẫn cần ghi rõ nguồn và tuân thủ các quy định về sở hữu trí tuệ.
            </p>
          </div>

          <div className="bg-green-50 p-8 rounded-2xl border border-green-100 w-full md:w-auto shadow-sm">
            <p className="text-xs text-[#FBBC05] uppercase tracking-widest font-black mb-4 border-b border-green-100 pb-2">Thông tin Tác giả</p>
            <p className="text-2xl font-black font-sans text-slate-900 mb-2">{ARTICLE_DATA.author}</p>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">
              {ARTICLE_DATA.authorDetail} <br/>
              {ARTICLE_DATA.authorLocation}
            </p>
          </div>
          
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-black">© 2026 Google-Themed Competition Portal</p>
           <button onClick={scrollToTop} className="flex items-center gap-3 text-xs text-white font-black uppercase tracking-widest transition-all bg-[#34A853] hover:bg-[#2e9649] px-6 py-3 rounded-full shadow-lg shadow-green-900/20 active:scale-95">
             Lên đầu trang <ChevronUp className="w-5 h-5" />
           </button>
        </div>
      </footer>
    </div>
  );
}
