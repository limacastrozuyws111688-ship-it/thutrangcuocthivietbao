import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, Award, RotateCcw, ChevronRight,
  Download, Upload, Trophy, Timer, User, AlertTriangle, ShieldCheck, FileWarning
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BASIC_QUIZ_DATA, ADVANCED_QUIZ_DATA } from '../constants';

const InteractiveQuiz = () => {
  const [quizSets, setQuizSets] = useState({ basic: BASIC_QUIZ_DATA, advanced: ADVANCED_QUIZ_DATA });
  const [activeLevel, setActiveLevel] = useState<null | 'basic' | 'advanced'>(null);
  
  const [quizState, setQuizState] = useState<'intro' | 'active' | 'result' | 'leaderboard'>('intro');
  const [userName, setUserName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [leaderboard, setLeaderboard] = useState([
    { name: "Chuyên gia Mạng", level: "advanced", score: 10, time: 38 },
    { name: "Người đọc tỉnh táo", level: "basic", score: 9, time: 45 },
  ]);
  const [toastMessage, setToastMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const currentQuizData = activeLevel ? quizSets[activeLevel] : [];

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    let interval: any;
    if (quizState === 'active' && startTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizState, startTime]);

  const startQuiz = (level: 'basic' | 'advanced') => {
    if (!userName.trim()) {
      showToast('Vui lòng nhập tên để bắt đầu!', 'error');
      return;
    }
    setActiveLevel(level);
    setQuizState('active');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setStartTime(Date.now());
    setTimeElapsed(0);
  };

  const handleSelect = (id: string) => {
    if (selectedAnswer) return; 
    setSelectedAnswer(id);
    if (id === currentQuizData[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < currentQuizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      const finalTime = Math.floor((Date.now() - (startTime || 0)) / 1000);
      const newEntry = { name: userName.trim(), level: activeLevel!, score, time: finalTime };
      
      const updatedLeaderboard = [...leaderboard, newEntry].sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time - b.time;
      });
      
      setLeaderboard(updatedLeaderboard);
      setQuizState('result');
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(quizSets, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bo_cau_hoi_tin_gia_full.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Đã tải xuống bộ câu hỏi!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (importedData && importedData.basic && importedData.advanced) {
          setQuizSets(importedData);
          showToast('Cập nhật bộ câu hỏi thành công!');
        } else {
          showToast('Định dạng tệp JSON không hợp lệ!', 'error');
        }
      } catch (err) {
        showToast('Lỗi phân tích tệp JSON!', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const renderResult = () => {
    let resultMessage = "";
    let resultColor = "";
    let icon = null;

    if (activeLevel === 'advanced') {
      if (score >= 9) {
        resultMessage = "Tư duy phân tích rất tốt, có khả năng nhận diện tin giả ở mức cao";
        resultColor = "text-green-600";
        icon = <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />;
      } else if (score >= 7) {
        resultMessage = "Nhận thức khá tốt, cần tăng cường phản xạ kiểm chứng";
        resultColor = "text-blue-600";
        icon = <CheckCircle2 className="w-16 h-16 text-blue-500 mx-auto mb-4" />;
      } else if (score >= 5) {
        resultMessage = "Đã có nền tảng nhưng còn dễ bị dẫn dắt ở tình huống phức tạp";
        resultColor = "text-amber-600";
        icon = <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />;
      } else {
        resultMessage = "Cần bổ sung kỹ năng đọc – lọc – kiểm chứng thông tin";
        resultColor = "text-red-600";
        icon = <FileWarning className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      }
    } else {
      if (score >= 8) {
        resultMessage = "Bạn có nhận thức tốt về tin giả";
        resultColor = "text-green-600";
        icon = <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />;
      } else if (score >= 5) {
        resultMessage = "Bạn cần cẩn trọng hơn khi tiếp nhận thông tin";
        resultColor = "text-amber-600";
        icon = <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />;
      } else {
        resultMessage = "Bạn có nguy cơ bị tin giả tác động";
        resultColor = "text-red-600";
        icon = <FileWarning className="w-16 h-16 text-red-500 mx-auto mb-4" />;
      }
    }

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 relative z-10"
      >
        <div className="mb-10 relative">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            className="relative z-10"
          >
            {icon}
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full"></div>
        </div>

        <h3 className="text-5xl md:text-6xl font-black font-sans text-slate-950 mb-4 tracking-tighter">Hoàn thành thử thách!</h3>
        <p className="text-xl text-slate-500 mb-12 font-medium">Bạn đã trả lời xong các câu hỏi, <span className="font-black text-[#4285F4]">{userName}</span></p>
        
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 mb-12 max-w-2xl mx-auto">
          <div className="flex-1 bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-2xl shadow-blue-500/5 flex flex-col items-center justify-center">
             <div className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mb-4">Điểm nhận diện</div>
             <div className="text-7xl font-black text-[#4285F4] mb-2">
               {score}<span className="text-2xl text-slate-200 font-bold">/10</span>
             </div>
             <div className="w-12 h-1 bg-[#4285F4]/20 rounded-full"></div>
          </div>
          <div className="flex-1 bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-2xl shadow-green-500/5 flex flex-col items-center justify-center">
             <div className="text-[10px] uppercase tracking-[0.4em] text-slate-400 font-black mb-4">Thời gian phản xạ</div>
             <div className="text-7xl font-black text-[#34A853] mb-2">
                {timeElapsed}<span className="text-2xl text-slate-200 font-bold">s</span>
             </div>
             <div className="w-12 h-1 bg-[#34A853]/20 rounded-full"></div>
          </div>
        </div>

        <div className={`text-xl font-black mb-16 px-10 max-w-2xl mx-auto leading-relaxed ${resultColor} bg-white py-8 rounded-[3rem] border-4 border-slate-50 shadow-inner relative overflow-hidden group/message`}>
          <div className={`absolute top-0 left-0 w-2 h-full ${resultColor.replace('text', 'bg')}`}></div>
          <p className="relative z-10 italic">“{resultMessage}”</p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <button 
            onClick={() => setQuizState('leaderboard')}
            className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 bg-[#FBBC05] text-white rounded-3xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-yellow-500/30 hover:-translate-y-1 active:scale-95"
          >
            <Trophy className="w-6 h-6 transition-transform group-hover:rotate-12" /> Xem Bảng Xếp Hạng
          </button>
          <button 
            onClick={() => { setQuizState('intro'); setUserName(''); setActiveLevel(null); }}
            className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-slate-900/20 hover:-translate-y-1 active:scale-95"
          >
            <RotateCcw className="w-6 h-6 transition-transform group-hover:-rotate-45" /> Thử thách lại
          </button>
        </div>
      </motion.div>
    );
  };

  const renderLeaderboard = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-12 relative z-10"
      >
        <div className="text-center mb-16">
          <div className="relative inline-block">
             <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6 relative z-10 drop-shadow-2xl" />
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-400 blur-2xl rounded-full opacity-40"></div>
          </div>
          <h3 className="text-5xl font-black font-sans text-slate-950 uppercase tracking-tighter shadow-sm">BẢNG VÀNG DANH DỰ</h3>
          <p className="text-slate-500 mt-4 text-lg font-medium">Vinh danh những công dân có "đề kháng số" xuất sắc nhất</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border-4 border-slate-50 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-white text-[10px] uppercase tracking-[0.4em]">
                  <th className="p-8 font-black text-center w-24">Hạng</th>
                  <th className="p-8 font-black">Người chơi</th>
                  <th className="p-8 font-black text-center">Cấp độ</th>
                  <th className="p-8 font-black text-center">Hiệu suất</th>
                  <th className="p-8 font-black text-center">Tốc độ</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => {
                  const isCurrentUser = entry.name === userName && entry.score === score && entry.time === timeElapsed;
                  return (
                    <tr key={index} className={`border-b border-slate-50 last:border-none transition-all duration-300 ${isCurrentUser ? 'bg-blue-50/50' : 'hover:bg-slate-50/50'}`}>
                      <td className="p-8 text-center">
                        {index === 0 ? <div className="text-4xl drop-shadow-lg">🥇</div> : 
                         index === 1 ? <div className="text-4xl drop-shadow-lg">🥈</div> : 
                         index === 2 ? <div className="text-4xl drop-shadow-lg">🥉</div> : 
                         <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 font-black text-lg">{index + 1}</div>}
                      </td>
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black uppercase text-sm">
                              {entry.name.charAt(0)}
                           </div>
                           <div>
                              <div className="text-slate-950 font-black text-xl">{entry.name}</div>
                              {isCurrentUser && <span className="text-[9px] bg-red-500 text-white px-3 py-1 rounded-full font-black uppercase tracking-widest mt-1 inline-block">Thành tích mới của bạn</span>}
                           </div>
                        </div>
                      </td>
                      <td className="p-8 text-center text-[10px] font-black uppercase tracking-widest">
                        {entry.level === 'advanced' ? 
                          <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl">Nâng cao</span> : 
                          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl">Cơ bản</span>}
                      </td>
                      <td className="p-8 text-center text-red-600 font-black text-3xl">{entry.score}<span className="text-sm opacity-20">/10</span></td>
                      <td className="p-8 text-center text-slate-400 font-bold text-xl">{entry.time}s</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center">
           <button 
              onClick={() => { setQuizState('intro'); setUserName(''); setActiveLevel(null); }}
              className="inline-flex items-center gap-4 px-10 py-5 bg-white text-slate-600 rounded-3xl font-black uppercase tracking-widest text-xs border-2 border-slate-100 hover:bg-slate-900 hover:text-white transition-all shadow-xl hover:-translate-y-1 active:scale-95"
            >
              <RotateCcw className="w-6 h-6" /> Quay lại trang bắt đầu
            </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="my-16 bg-white border-2 border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.1)] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '50%' }}
            animate={{ opacity: 1, y: 0, x: '0%' }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] px-8 py-5 rounded-[2rem] shadow-2xl font-black text-sm uppercase tracking-widest flex items-center gap-4 backdrop-blur-xl border-2 ${toastMessage.type === 'error' ? 'bg-[#EA4335]/90 text-white border-red-500/20' : 'bg-[#34A853]/90 text-white border-green-500/20'}`}
          >
            {toastMessage.type === 'error' ? <XCircle className="w-6 h-6"/> : <CheckCircle2 className="w-6 h-6"/>}
            {toastMessage.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-0 left-0 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white text-[10px] font-black uppercase tracking-[0.3em] px-8 py-4 rounded-br-3xl z-10 shadow-2xl shadow-blue-500/20">
        Khu vực tương tác
      </div>

      {quizState === 'intro' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 mt-6 relative z-10"
        >
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-28 h-28 bg-white border-8 border-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] rounded-[3rem] opacity-20 blur-xl animate-pulse"></div>
            <Trophy className="w-14 h-14 text-[#4285F4] relative z-10" />
          </motion.div>
          
          <h3 className="text-4xl md:text-7xl font-black font-sans text-slate-950 mb-8 uppercase tracking-tighter leading-[1.1]">
            KIỂM TRA <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">NĂNG LỰC</span> <br/>
            <span className="text-slate-900 drop-shadow-sm">NHẬN DIỆN TIN GIẢ</span>
          </h3>
          
          <p className="text-slate-500 max-w-2xl mx-auto mb-16 text-xl font-medium leading-relaxed">
            Bạn có tự tin mình đủ tỉnh táo trước những cạm bẫy thông tin mạng? Nhập danh tính của bạn để bắt đầu thử thách!
          </p>
          
          <div className="max-w-2xl mx-auto mb-16 p-10 md:p-14 rounded-[4rem] bg-gradient-to-b from-slate-50 to-white border-2 border-slate-100 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] relative group/input">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2 rounded-full border-2 border-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Đăng ký tham gia</div>
             
             <div className="flex items-center bg-white border-4 border-slate-50 rounded-3xl p-4 mb-10 focus-within:border-[#4285F4]/30 focus-within:shadow-[0_0_50px_-10px_rgba(66,133,244,0.3)] transition-all duration-500">
               <User className="w-8 h-8 text-[#4285F4] mx-4" />
               <input 
                 type="text" 
                 placeholder="Họ và tên của bạn?" 
                 className="w-full bg-transparent border-none outline-none px-2 py-4 text-slate-900 text-2xl font-black placeholder:text-slate-200 placeholder:font-black"
                 value={userName}
                 onChange={(e) => setUserName(e.target.value)}
                 onKeyDown={(e) => { if(e.key === 'Enter' && userName.trim()) startQuiz('basic'); }}
               />
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button 
                  onClick={() => startQuiz('basic')}
                  disabled={!userName.trim()}
                  className={`group relative py-8 rounded-[2rem] font-black transition-all duration-500 overflow-hidden shadow-2xl ${userName.trim() ? 'bg-white text-slate-800 border-2 border-slate-100 hover:border-[#34A853]/50 hover:shadow-green-500/20 active:scale-95' : 'bg-slate-50 text-slate-200 cursor-not-allowed shadow-none border-none'}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-tr from-[#34A853] to-[#71cc8a] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <ShieldCheck className={`w-10 h-10 mb-2 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 ${userName.trim() ? 'text-[#34A853]' : 'text-slate-100'}`} />
                    <span className="text-xl uppercase tracking-widest mb-1 group-hover:text-white">Cơ bản</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-white">Độ khó: Dễ</span>
                  </div>
                </button>

                <button 
                  onClick={() => startQuiz('advanced')}
                  disabled={!userName.trim()}
                  className={`group relative py-8 rounded-[2rem] font-black transition-all duration-500 overflow-hidden shadow-2xl ${userName.trim() ? 'bg-white text-slate-800 border-2 border-slate-100 hover:border-[#EA4335]/50 hover:shadow-red-500/20 active:scale-95' : 'bg-slate-50 text-slate-200 cursor-not-allowed shadow-none border-none'}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-tr from-[#EA4335] to-[#f07b71] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <AlertTriangle className={`w-10 h-10 mb-2 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 ${userName.trim() ? 'text-[#EA4335]' : 'text-slate-100'}`} />
                    <span className="text-xl uppercase tracking-widest mb-1 group-hover:text-white">Nâng cao</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 group-hover:text-white">Độ khó: Cao</span>
                  </div>
                </button>
             </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 bg-slate-50/50 p-8 rounded-[3rem] border border-slate-100/50 backdrop-blur-sm">
            <span className="w-full block text-slate-300 font-extrabold uppercase tracking-[0.4em] text-[10px] mb-2">Trung tâm điều khiển câu hỏi</span>
            <button 
              onClick={handleExportJSON} 
              className="flex items-center gap-4 text-slate-600 hover:text-[#4285F4] font-black uppercase tracking-widest text-xs transition-all bg-white px-8 py-4 rounded-2xl border border-slate-100 shadow-xl hover:-translate-y-1 active:scale-95"
            >
              <Download className="w-5 h-5" /> Tải về (.json)
            </button>
            
            <label className="flex items-center gap-4 text-slate-600 hover:text-[#EA4335] font-black uppercase tracking-widest text-xs transition-all bg-white px-8 py-4 rounded-2xl border border-slate-100 shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer">
              <Upload className="w-5 h-5" /> Tải lên (.json)
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>
        </motion.div>
      )}

      {quizState === 'active' && (
        <div className="mt-12 relative z-10">
          <div className="mb-16">
            <div className="flex flex-wrap justify-between items-center text-sm font-black text-slate-900 mb-8 gap-6">
              <span className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl text-[10px] uppercase tracking-[0.3em] border-2 border-slate-50 shadow-xl">
                Câu {currentQuestion + 1} <span className="mx-2 opacity-20">/</span> {currentQuizData.length} 
                <span className={`ml-4 px-3 py-1 rounded-lg text-white ${activeLevel === 'advanced' ? 'bg-[#EA4335]' : 'bg-[#4285F4]'}`}>
                  {activeLevel === 'advanced' ? 'Nâng cao' : 'Cơ bản'}
                </span>
              </span>
              <div className="flex items-center gap-8 bg-white/80 backdrop-blur-md border-2 border-slate-50 shadow-2xl px-8 py-3 rounded-2xl text-[10px] uppercase tracking-[0.3em]">
                <span className="flex items-center gap-3 text-slate-500"><Timer className="w-5 h-5 text-[#FBBC05]"/> <span className="w-8 text-right font-black">{timeElapsed}s</span></span>
                <div className="w-px h-6 bg-slate-100"></div>
                <span className="text-[#34A853] flex items-center gap-3 font-black">Lúc này: {score}</span>
              </div>
            </div>
            <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner border-2 border-white p-1">
              <motion.div 
                className={`h-full rounded-full bg-gradient-to-r ${activeLevel === 'advanced' ? 'from-[#EA4335] to-[#f07b71]' : 'from-[#4285F4] to-[#34A853]'}`}
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / currentQuizData.length) * 100}%` }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              ></motion.div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "anticipate" }}
            >
              <div className="mb-12">
                 <h4 className="text-3xl md:text-5xl font-black text-slate-950 mb-4 font-sans leading-[1.2] tracking-tight">
                   {currentQuizData[currentQuestion].question}
                 </h4>
                 <div className="w-20 h-2 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-12">
                {currentQuizData[currentQuestion].options.map((opt) => {
                  const isSelected = selectedAnswer === opt.id;
                  const isCorrectAnswer = opt.id === currentQuizData[currentQuestion].correctAnswer;
                  
                  let buttonClasses = "w-full text-left p-8 rounded-[2rem] border-4 transition-all duration-400 flex items-center justify-between group shadow-lg ";
                  
                  if (!selectedAnswer) {
                    buttonClasses += "bg-white border-slate-50 hover:border-[#4285F4]/30 hover:shadow-2xl hover:shadow-blue-500/10 text-slate-700 hover:-translate-y-1";
                  } else {
                    if (isSelected && isCorrectAnswer) {
                      buttonClasses += "bg-[#34A853] border-[#34A853] text-white shadow-[#34A853]/40 scale-[1.02] z-10";
                    } else if (isSelected && !isCorrectAnswer) {
                      buttonClasses += "bg-[#EA4335] border-[#EA4335] text-white shadow-[#EA4335]/40 scale-[1.02] z-10";
                    } else if (isCorrectAnswer) {
                       buttonClasses += "bg-white border-[#34A853] text-[#34A853] opacity-100 shadow-[#34A853]/10";
                    } else {
                      buttonClasses += "bg-slate-50 border-slate-50 text-slate-200 opacity-40 grayscale pointer-events-none";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      disabled={selectedAnswer !== null}
                      className={buttonClasses}
                    >
                      <div className="flex items-center gap-8">
                        <span className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all flex-shrink-0 ${!selectedAnswer ? 'bg-slate-100 text-slate-400 group-hover:bg-[#4285F4] group-hover:text-white group-hover:scale-110 group-hover:rotate-6' : (isSelected || isCorrectAnswer) ? 'bg-white text-slate-900 border-2 border-slate-100' : 'bg-slate-200 text-slate-300'}`}>
                          {opt.id}
                        </span>
                        <span className="font-bold text-xl md:text-2xl leading-relaxed">{opt.text}</span>
                      </div>
                      
                      {selectedAnswer && isCorrectAnswer && <ShieldCheck className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-[#34A853]'} animate-bounce`} />}
                      {selectedAnswer && isSelected && !isCorrectAnswer && <XCircle className="w-10 h-10 text-white animate-shake" />}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-center bg-slate-50 p-8 rounded-[2.5rem] border-2 border-white shadow-xl"
                >
                  <div className="hidden md:block">
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Phản hồi hệ thống</p>
                     <p className="text-slate-900 font-bold">Hãy cẩn trọng với các thông tin gây sốc!</p>
                  </div>
                  <button 
                    onClick={handleNext}
                    className="flex items-center gap-5 px-12 py-6 bg-slate-950 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-2xl hover:-translate-y-2 active:scale-95 group/next"
                  >
                    {currentQuestion < currentQuizData.length - 1 ? 'Tiếp tục thử thách' : 'Tổng kết chiến tích'} 
                    <ChevronRight className="w-6 h-6 text-[#FBBC05] transition-transform group-hover/next:translate-x-2" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {quizState === 'result' && renderResult()}
      {quizState === 'leaderboard' && renderLeaderboard()}
    </div>
  );
};

export default InteractiveQuiz;
