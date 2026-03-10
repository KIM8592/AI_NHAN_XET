const { useState, useEffect, useRef } = React;

    // Helper to create small emoji icon React components
    function makeEmojiIcon(symbol) {
      return ({ size = 16, className = "" } = {}) => {
        const style = { fontSize: size, lineHeight: 1, display: 'inline-block' };
        return <span aria-hidden="true" className={className} style={style}>{symbol}</span>;
      };
    }

    // Emoji icon components requested
    const Plus = makeEmojiIcon('➕'), Trash2 = makeEmojiIcon('🗑️'), LayoutGrid = makeEmojiIcon('🧩'),
          Calendar = makeEmojiIcon('📅'), BookOpen = makeEmojiIcon('📖'), UserPlus = makeEmojiIcon('👤➕'),
          Sparkles = makeEmojiIcon('✨'), Loader2 = makeEmojiIcon('⏳'), Wand2 = makeEmojiIcon('🪄'),
          GraduationCap = makeEmojiIcon('🎓'), Edit2 = makeEmojiIcon('✏️'), Eye = makeEmojiIcon('👁️'),
          EyeOff = makeEmojiIcon('🙈'), Download = makeEmojiIcon('⬇️'), ShieldAlert = makeEmojiIcon('🛡️'),
          CheckCircle2 = makeEmojiIcon('✅'), User = makeEmojiIcon('👤'), Star = makeEmojiIcon('⭐'),
          Settings = makeEmojiIcon('⚙️'), Mic = makeEmojiIcon('🎤');

    // Firebase config (kept)
    const myFirebaseConfig = {
      apiKey: "AIzaSyCuomTR3xRgkk4YLCvc7bCKR2chx--AxvA",
      authDomain: "th-khanh-binh-manager.firebaseapp.com",
      projectId: "th-khanh-binh-manager",
      storageBucket: "th-khanh-binh-manager.firebasestorage.app",
      messagingSenderId: "772130590846",
      appId: "1:772130590846:web:108a05c64e2c5083ce882f"
    };
    const firebaseConfig = myFirebaseConfig;

    // Init firebase compat
    if (!window.firebase.apps.length) {
      window.firebase.initializeApp(firebaseConfig);
    }
    const auth = window.firebase.auth();
    const db = window.firebase.firestore();
    
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch(console.error);

auth.signOut().then(() => {
  console.log("Đã signOut session cũ");
});

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account'
});

function loginGoogle() {
  auth.signInWithPopup(provider)
    .then(result => {
      console.log("Login OK:", result.user.email);
    })
    .catch(err => {
      console.error(err);
    });
}

    const appId = 'th-khanh-binh-manager';

    const AUTHOR_NAME = "Trần Trọng Kim";
    const AUTHOR_PHONE = "0964567806";

    const QUALITIES = [
      { id: 'patriotic', name: 'Yêu nước', prompt: 'Yêu thiên nhiên, di sản, có ý thức bảo vệ môi trường, tự hào về quê hương.' },
      { id: 'kind', name: 'Nhân ái', prompt: 'Yêu thương mọi người, sẵn sàng giúp đỡ bạn bè, tôn trọng sự khác biệt.' },
      { id: 'diligent', name: 'Chăm chỉ', prompt: 'Tự giác học tập, ham học hỏi, yêu lao động, có trách nhiệm với việc học.' },
      { id: 'honest', name: 'Trung thực', prompt: 'Thật thà trong học tập và sinh hoạt, dám nhận lỗi, không gian lận.' },
      { id: 'responsible', name: 'Trách nhiệm', prompt: 'Có ý thức với bản thân, gia đình và tập thể, hoàn thành tốt nhiệm vụ.' }
    ];

    const GENERAL_COMPETENCIES = [
      { id: 'self_control', name: 'Tự chủ và tự học', prompt: 'Biết tự thực hiện nhiệm vụ, điều chỉnh cảm xúc, có thói quen tự học.' },
      { id: 'communication', name: 'Giao tiếp và hợp tác', prompt: 'Biết lắng nghe, trình bày ý kiến, phối hợp tốt khi làm việc nhóm.' },
      { id: 'problem_solving', name: 'Giải quyết vấn đề và sáng tạo', prompt: 'Biết phát hiện vấn đề đơn giản, đề xuất cách giải quyết mới mẻ.' }
    ];

    const SPECIFIC_COMPETENCIES = [
      { id: 'lang', name: 'Ngôn ngữ', prompt: 'Đọc lưu loát, diễn cảm. Nói mạch lạc. Viết đúng chính tả, sạch đẹp.' },
      { id: 'math', name: 'Tính toán', prompt: 'Thực hiện tốt các phép tính. Vận dụng kiến thức vào thực tế chính xác.' },
      { id: 'sci', name: 'Khoa học', prompt: 'Quan sát tốt thế giới tự nhiên. Có ý thức bảo vệ sức khỏe, môi trường.' },
      { id: 'tech', name: 'Công nghệ', prompt: 'Sử dụng bộ đồ dùng học tập hiệu quả. Biết dùng thiết bị đơn giản.' },
      { id: 'it', name: 'Tin học', prompt: 'Sử dụng thiết bị số cơ bản. Thu thập thông tin qua hình ảnh gợi ý.' },
      { id: 'art', name: 'Thẩm mĩ', prompt: 'Cảm nhận vẻ đẹp âm nhạc, hội họa. Diễn đạt cảm xúc qua nghệ thuật.' },
      { id: 'phys', name: 'Thể chất', prompt: 'Tự giác tập luyện. Tích cực tham gia trò chơi vận động.' }
    ];

    const SUBJECT_TO_COMPETENCY_MAP = {
      'Tiếng Việt': 'lang', 'Toán': 'math', 'Khoa học': 'sci', 'Tự nhiên và Xã hội': 'sci',
      'Công nghệ': 'tech', 'Tin học': 'it', 'Mĩ thuật': 'art', 'Giáo dục Thể chất': 'phys'
    };

    // small Zalo svg (kept)
    const ZaloIcon = ({ size = 16, className = "" }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M22.507 11.23c-.156-.464-.34-.916-.548-1.353-.207-.436-.45-.858-.72-1.26a10.023 10.023 0 0 0-1.077-1.378 10.662 10.662 0 0 0-1.428-1.265 11.996 11.996 0 0 0-1.742-1.082A13.437 13.437 0 0 0 14.885 4.1a14.897 14.897 0 0 0-2.264-.474c-.38-.046-.763-.075-1.147-.087-.384-.012-.767-.008-1.15.012-.383.02-.764.055-1.145.105-.38.05-.758.115-1.134.195a14.864 14.864 0 0 0-2.22.65c-.358.13-.71.277-1.054.44a11.905 11.905 0 0 0-1.928 1.157 10.323 10.323 0 0 0-1.547 1.455c-.23.272-.44.558-.626.858a9.146 9.146 0 0 0-.825 2.022 8.79 8.79 0 0 0-.256 2.115c.01.353.04.706.087 1.055.048.35.114.697.198 1.04.084.343.187.68.307 1.01.12.33.256.654.407.97.15.316.315.626.494.927.18.3.37.593.578.877.207.284.426.56.654.825l-.578 2.316c-.052.207-.063.424-.032.636.03.21.096.413.195.6a1.442 1.442 0 0 0 .61.624c.24.13.51.196.78.196a1.517 1.517 0 0 0 .584-.117l3.522-1.507c.394.135.795.247 1.202.333.407.086.82.147 1.236.183.416.036.834.048 1.253.036.418-.012.836-.048 1.25-.108a14.892 14.892 0 0 0 2.417-.63 12.01 12.01 0 0 0 2.15-1.045 10.323 10.323 0 0 0 1.763-1.42 9.074 9.074 0 0 0 1.233-1.69 8.72 8.72 0 0 0 .864-2.128 9.052 9.052 0 0 0 .04-2.227z" />
      </svg>
    );

    // EditableCell with speech-to-text support
    const EditableCell = ({ value, onSave, placeholder, className }) => {
      const [localValue, setLocalValue] = useState(value || '');
      const textareaRef = useRef(null);
      const timeoutRef = useRef(null);
      const recognitionRef = useRef(null);
      const [recognizing, setRecognizing] = useState(false);

      const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = textarea.scrollHeight + 'px';
        }
      };

      useEffect(() => {
        setLocalValue(value || '');
        setTimeout(adjustHeight, 0);
      }, [value]);

      const handleChange = (e) => {
        const newVal = e.target.value;
        setLocalValue(newVal);
        adjustHeight();

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          onSave(newVal);
        }, 800);
      };

      const stopRecognition = () => {
        const rec = recognitionRef.current;
        if (rec) {
          try { rec.stop(); } catch(e){}
          recognitionRef.current = null;
        }
        setRecognizing(false);
      };

      const startRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          alert('Trình duyệt không hỗ trợ nhập giọng nói (SpeechRecognition). Vui lòng dùng Chrome/Edge trên máy tính hoặc Chrome trên Android.');
          return;
        }
        const rec = new SpeechRecognition();
        rec.lang = 'vi-VN';
        rec.interimResults = true;
        rec.maxAlternatives = 1;
        rec.continuous = false;

        rec.onstart = () => setRecognizing(true);
        rec.onerror = (e) => {
          console.error('Speech recognition error', e);
          setRecognizing(false);
        };
        rec.onend = () => {
          setRecognizing(false);
          recognitionRef.current = null;
        };
        rec.onresult = (evt) => {
          let interim = '';
          let final = '';
          for (let i = evt.resultIndex; i < evt.results.length; ++i) {
            const res = evt.results[i];
            if (res.isFinal) final += res[0].transcript;
            else interim += res[0].transcript;
          }
          // Append final text when available, otherwise show interim
          if (final) {
            const newVal = (localValue ? localValue + ' ' : '') + final.trim();
            setLocalValue(newVal);
            adjustHeight();
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            // Save immediately after final
            onSave(newVal);
          } else if (interim) {
            // show interim but don't save
            setLocalValue((localValue ? localValue + ' ' : '') + interim.trim());
            adjustHeight();
          }
        };

        recognitionRef.current = rec;
        try { rec.start(); } catch(e) { console.error(e); }
      };

      const toggleMic = () => {
        if (recognizing) stopRecognition();
        else startRecognition();
      };

      useEffect(() => {
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); stopRecognition(); };
      }, []);

      return (
        <div className="relative">
          <textarea
            ref={textareaRef}
            className={`${className} overflow-hidden whitespace-pre-wrap break-words pr-10`}
            rows={1}
            value={localValue}
            onChange={handleChange}
            placeholder={placeholder}
          />
          <button
            title={ (window.SpeechRecognition || window.webkitSpeechRecognition) ? (recognizing ? 'Dừng ghi âm' : 'Nhập giọng nói') : 'Trình duyệt không hỗ trợ giọng nói' }
            onClick={toggleMic}
            disabled={!(window.SpeechRecognition || window.webkitSpeechRecognition)}
            className={`absolute right-1 top-1/2 -translate-y-1/2 p-1 text-sm rounded-md ${recognizing ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'} `}
            style={{width:34, height:34}}
          >
            <Mic size={16}/>
          </button>
        </div>
      );
    };

    const App = () => {
      const [user, setUser] = useState(null);
      const [years, setYears] = useState([]);
      const [classes, setClasses] = useState([]);
      const [months, setMonths] = useState([]);
      const [subjects, setSubjects] = useState([]);
      const [students, setStudents] = useState([]);
      const [studentData, setStudentData] = useState({});

      const [selectedYearId, setSelectedYearId] = useState('');
      const [selectedClassId, setSelectedClassId] = useState('');
      const [selectedMonthId, setSelectedMonthId] = useState('');
      const [selectedSubId, setSelectedSubId] = useState('');

      const [viewMode, setViewMode] = useState('subject');
      const [showLevel, setShowLevel] = useState(true);
      const [showNote, setShowNote] = useState(true);

      const [modalType, setModalType] = useState(null);
      const [confirmDelete, setConfirmDelete] = useState(null);
      const [editItem, setEditItem] = useState(null);
      const [inputValue, setInputValue] = useState('');
      const [bulkInput, setBulkInput] = useState('');
      const [aiPrompt, setAiPrompt] = useState('');
      const [isGenerating, setIsGenerating] = useState(false);
      const [copySuccess, setCopySuccess] = useState(null);
      const [isAuthValid, setIsAuthValid] = useState(true);

      const [showApiKeyModal, setShowApiKeyModal] = useState(false);
      const [apiKeyInput, setApiKeyInput] = useState(localStorage.getItem('ai_api_key') || '');
      const [apiKeyMissingNote, setApiKeyMissingNote] = useState(false);

      // NEW: modal to force user to select at least one level before bulk AI
      const [showSelectLevelModal, setShowSelectLevelModal] = useState(false);

      // NEW: edit student modal state
      const [editStudentModalOpen, setEditStudentModalOpen] = useState(false);
      const [editStudentForm, setEditStudentForm] = useState({ id: '', name: '', status: 'active', statusNote: '' });

      // Drag & drop states
      const [draggingIdx, setDraggingIdx] = useState(null);

      // Speech state for aiPrompt
      const aiRecognitionRef = useRef(null);
      const [aiRecognizing, setAiRecognizing] = useState(false);

      // helper to get nested collection refs using compat API
      const col = (...segments) => {
        // segments is like ['artifacts', appId, 'public', 'data', 'years']
        let ref = db.collection(segments[0]);
        for (let i = 1; i < segments.length; i++) {
          if (i % 2 === 1) {
            // doc id
            ref = ref.doc(segments[i]);
          } else {
            // collection
            ref = ref.collection(segments[i]);
          }
        }
        return ref;
      };

      useEffect(() => {
        if (window.lucide && window.lucide.replace) window.lucide.replace();
      });

      useEffect(() => {
        const _v = (s) => btoa(unescape(encodeURIComponent(s)));
        if (_v(AUTHOR_NAME) !== "VHLhuqduIFRy4buNbmcgS2lt" || _v(AUTHOR_PHONE) !== "MDk2NDU2NzgwNg==") {
          setIsAuthValid(false);
        }
      }, []);

      useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(setUser);
  return () => unsubscribe();
}, []);


      useEffect(() => {
        if (!user || !isAuthValid) return;
        const yearsRef = col('artifacts', appId, 'public', 'data', 'years');
        const classesRef = col('artifacts', appId, 'public', 'data', 'classes');
        const monthsRef = col('artifacts', appId, 'public', 'data', 'months');
        const subjectsRef = col('artifacts', appId, 'public', 'data', 'subjects');

        const unsubYears = yearsRef.onSnapshot(s => {
          const arr = []; s.forEach(d => arr.push({ id: d.id, ...d.data() }));
          setYears(arr.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0)));
        });
        const unsubCla = classesRef.onSnapshot(s => {
          const arr = []; s.forEach(d => arr.push({ id: d.id, ...d.data() }));
          setClasses(arr.sort((a,b) => a.name.localeCompare(b.name, 'vi', { numeric: true })));
        });
        const unsubMon = monthsRef.onSnapshot(s => {
          const arr = []; s.forEach(d => arr.push({ id: d.id, ...d.data() }));
          setMonths(arr.sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0)));
        });
        const unsubSub = subjectsRef.onSnapshot(s => {
          const arr = []; s.forEach(d => arr.push({ id: d.id, ...d.data() }));
          setSubjects(arr.sort((a,b) => a.name.localeCompare(b.name, 'vi')));
        });

        return () => { try{unsubYears();unsubCla();unsubMon();unsubSub();}catch(e){} };
      }, [user, isAuthValid]);

      // --- START: New helpers + auto-select academic year & month logic ---
      // trả về [startYear, endYear] dựa trên ngày
      const getAcademicYearRangeFromDate = (date) => {
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        // Tháng 1-7 => học kỳ 2: (năm trước) - (năm nay)
        if (month >= 1 && month <= 7) return [year - 1, year];
        // Tháng 8-12 => học kỳ 1: (năm nay) - (năm sau)
        return [year, year + 1];
      };

      // chuẩn hoá tên năm học thành cặp số [start, end] nếu có
      const normalizeYearNameToPair = (name) => {
        if (!name) return null;
        // tìm tất cả các chuỗi 4 chữ số (ví dụ 2025)
        const nums = String(name).match(/\d{4}/g);
        if (nums && nums.length >= 2) {
          return [parseInt(nums[0], 10), parseInt(nums[1], 10)];
        }
        return null;
      };

      // chuẩn hoá tên tháng sang số (1-12) nếu có
      const normalizeMonthNameToNumber = (name) => {
        if (!name) return null;
        const s = String(name).toLowerCase().trim();

        // try to find digits first (e.g., "2", "02", "Tháng 2", "Tháng 02")
        const digitMatch = s.match(/(\d{1,2})/);
        if (digitMatch) {
          const num = parseInt(digitMatch[1], 10);
          if (num >= 1 && num <= 12) return num;
        }

        // common Vietnamese spelled-out months
        const vn = {
          'tháng một':1,'tháng hai':2,'tháng ba':3,'tháng tư':4,'tháng năm':5,'tháng sáu':6,
          'tháng bảy':7,'tháng tám':8,'tháng chín':9,'tháng mười':10,'tháng mười một':11,'tháng mười hai':12,
          'tháng 1':1,'tháng 2':2,'tháng 3':3,'tháng 4':4,'tháng 5':5,'tháng 6':6,'tháng 7':7,'tháng 8':8,'tháng 9':9,'tháng 10':10,'tháng 11':11,'tháng 12':12
        };
        for (const k in vn) {
          if (s.includes(k)) return vn[k];
        }

        // English month names (in case)
        const en = ['january','february','march','april','may','june','july','august','september','october','november','december'];
        for (let i=0;i<en.length;i++){
          if (s.includes(en[i])) return i+1;
        }

        return null;
      };

      // Khi danh sách `years` được load, nếu user chưa chọn năm, auto chọn theo thời gian hệ thống
      useEffect(() => {
        if (!years || !years.length) return;
        if (selectedYearId) return; // không override nếu đã chọn thủ công

        const now = new Date();
        const [start, end] = getAcademicYearRangeFromDate(now);
        const canonicalLabel = `${start} - ${end}`;

        // thử match chính xác chuỗi "YYYY - YYYY" trước
        let found = years.find(y => (y.name || '').trim() === canonicalLabel);

        // nếu không có, thử phân tích số từ tên để so khớp (hỗ trợ "2025-2026", "2025/2026", "Năm học 2025 - 2026", ...)
        if (!found) {
          found = years.find(y => {
            const pair = normalizeYearNameToPair(y.name);
            return pair && pair[0] === start && pair[1] === end;
          });
        }

        if (found) {
          setSelectedYearId(found.id);
          console.log('Auto-selected academic year:', found.name);
        }
      }, [years, selectedYearId]);

      // Khi danh sách `months` được load, nếu user chưa chọn tháng, auto chọn tháng hiện tại theo hệ thống
      useEffect(() => {
        if (!months || !months.length) return;
        if (selectedMonthId) return; // don't override manual selection

        const now = new Date();
        const currentMonth = now.getMonth() + 1; // 1-12

        // Try to find a month entry whose name maps to currentMonth
        let found = months.find(m => normalizeMonthNameToNumber(m.name) === currentMonth);

        // fallback: try exact textual matches like "Tháng X", "X"
        if (!found) {
          found = months.find(m => {
            const n = (m.name || '').trim();
            const digits = n.match(/^\D*0?(\d{1,2})\D*$/);
            if (digits) {
              const v = parseInt(digits[1], 10);
              return v === currentMonth;
            }
            return false;
          });
        }

        if (found) {
          setSelectedMonthId(found.id);
          console.log('Auto-selected month:', found.name);
        }
      }, [months, selectedMonthId]);
      // --- END: New helpers + auto-select academic year & month logic ---

      useEffect(() => {
        if (!user || !selectedClassId || !selectedYearId || !isAuthValid) { setStudents([]); return; }
        const studentsRef = col('artifacts', appId, 'public', 'data', 'years', selectedYearId, 'classes', selectedClassId, 'students');
        const unsub = studentsRef.onSnapshot(s => {
          const arr = []; s.forEach(d => {
            const data = { id: d.id, ...d.data() };
            // ensure order exists (if not, set later when saving)
            arr.push(data);
          });
          // sort by order if present, else createdAt
          arr.sort((a,b) => {
            const av = (a.order !== undefined && a.order !== null) ? a.order : (a.createdAt || 0);
            const bv = (b.order !== undefined && b.order !== null) ? b.order : (b.createdAt || 0);
            return av - bv;
          });
          setStudents(arr);
        });
        return () => unsub();
      }, [user, selectedClassId, selectedYearId, isAuthValid]);

      useEffect(() => {
        if (!user || !selectedMonthId || !selectedClassId || !selectedYearId || !isAuthValid) { setStudentData({}); return; }
        if (viewMode === 'subject' && !selectedSubId) { setStudentData({}); return; }
        const key = viewMode === 'subject' ? `${selectedYearId}_${selectedSubId}_${selectedMonthId}_${selectedClassId}` : `${selectedYearId}_${viewMode}_${selectedMonthId}_${selectedClassId}`;
        const entriesRef = col('artifacts', appId, 'public', 'data', 'comments', key, 'entries');
        const unsub = entriesRef.onSnapshot(s => {
          const data = {};
          s.forEach(d => data[d.id] = d.data());
          setStudentData(data);
        });
        return () => unsub();
      }, [user, selectedSubId, selectedMonthId, selectedClassId, selectedYearId, viewMode, isAuthValid]);

      const updateCell = async (studentId, field, value) => {
        if (!user || !isAuthValid) return;

        // Prevent updates if student is transferred/dropped
        const stu = students.find(s => s.id === studentId);
        if (stu && (stu.status === 'transferred' || stu.status === 'dropped')) {
          // silently ignore or could show a toast - keep silent to avoid blocking UI
          return;
        }

        const key = viewMode === 'subject' ? `${selectedYearId}_${selectedSubId}_${selectedMonthId}_${selectedClassId}` : `${selectedYearId}_${viewMode}_${selectedMonthId}_${selectedClassId}`;
        const docRef = col('artifacts', appId, 'public', 'data', 'comments', key, 'entries').doc(studentId);

        let finalValue = value;
        const currentData = studentData[studentId];
        if (currentData && currentData[field] === value) finalValue = "";

        try {
          await docRef.set({ [field]: finalValue }, { merge: true });
        } catch(e) { console.error(e); }

        if (viewMode === 'subject' && field === 'level') {
          const subjectName = subjects.find(s => s.id === selectedSubId)?.name;
          const targetCompId = SUBJECT_TO_COMPETENCY_MAP[subjectName];
          if (targetCompId) {
            const compLevelValue = (finalValue === 'H') ? 'Đ' : finalValue;
            const compKey = `${selectedYearId}_specific_${selectedMonthId}_${selectedClassId}`;
            const compDocRef = col('artifacts', appId, 'public', 'data', 'comments', compKey, 'entries').doc(studentId);
            try { await compDocRef.set({ [`level_${targetCompId}`]: compLevelValue }, { merge: true }); } catch(e){ console.error(e); }
          }
        }
      };

      // open edit modal for a student
      const openEditStudent = (stu) => {
        setEditStudentForm({
          id: stu.id,
          name: stu.name || '',
          status: stu.status || 'active', // active | transferred | dropped
          statusNote: stu.statusNote || ''
        });
        setEditStudentModalOpen(true);
      };

      const saveEditStudent = async () => {
        if (!editStudentForm.id) return;
        try {
          const ref = col('artifacts', appId, 'public', 'data', 'years', selectedYearId, 'classes', selectedClassId, 'students').doc(editStudentForm.id);
          await ref.update({
            name: editStudentForm.name,
            status: editStudentForm.status,
            statusNote: editStudentForm.statusNote || ''
          });
          // Firestore snapshot will update students state; close modal
        } catch (e) {
          console.error("Lỗi khi lưu thông tin học sinh:", e);
        }
        setEditStudentModalOpen(false);
      };

      const runBulkAI = async () => {
        if (!isAuthValid || isGenerating) return;

        // NEW: Check that at least one student has a "level" selected for the current viewMode.
        const hasAnyLevelSelected = students.some(s => {
          const d = studentData[s.id] || {};
          // ignore transferred/dropped students
          if (s.status === 'transferred' || s.status === 'dropped') return false;
          if (viewMode === 'subject') return !!d.level;
          if (viewMode === 'competency' || viewMode === 'quality') {
            const comps = viewMode === 'competency' ? GENERAL_COMPETENCIES : QUALITIES;
            return comps.some(c => !!d[`level_${c.id}`]);
          }
          if (viewMode === 'specific') return SPECIFIC_COMPETENCIES.some(c => !!d[`level_${c.id}`]);
          return false;
        });

        if (!hasAnyLevelSelected) {
          // show blocking modal telling user to select at least one level
          setShowSelectLevelModal(true);
          return;
        }

        const apiKey = localStorage.getItem('ai_api_key') || '';
        if (!apiKey) {
          // show modal and a note to ask user to enter key or contact Thầy Kim
          setApiKeyMissingNote(true);
          setShowApiKeyModal(true);
          return;
        }

        // Lấy danh sách những em có mức đạt nhưng chưa có nhận xét
        const targets = students.filter(s => {
          // ignore transferred/dropped
          if (s.status === 'transferred' || s.status === 'dropped') return false;
          const d = studentData[s.id] || {};
          if (viewMode === 'subject') return d.level && !d.comment;
          if (viewMode === 'competency' || viewMode === 'quality') {
            const comps = viewMode === 'competency' ? GENERAL_COMPETENCIES : QUALITIES;
            return comps.some(c => d[`level_${c.id}`]) && !d.comment;
          }
          if (viewMode === 'specific') return SPECIFIC_COMPETENCIES.some(c => d[`level_${c.id}`]) && !d.comment;
          return false;
        });

        if (!targets.length) return;
        setIsGenerating(true);

        const subName = viewMode === 'subject' ? subjects.find(s=>s.id===selectedSubId)?.name : '';

        const chunkSize = 20;
        for (let i = 0; i < targets.length; i += chunkSize) {
          const chunk = targets.slice(i, i + chunkSize);

            const inputData = chunk.map(s => {
            const d = studentData[s.id] || {};
            let info = "";
            if (viewMode === 'subject') info = `Mức: ${d.level}. Ghi chú: ${d.note || 'Không'}`;
            else {
              const comps = viewMode === 'competency' ? GENERAL_COMPETENCIES : (viewMode === 'quality' ? QUALITIES : SPECIFIC_COMPETENCIES);
              info = comps.map(c => d[`level_${c.id}`] ? `${c.name}: ${d[`level_${c.id}`]}` : null).filter(Boolean).join(', ');
              if (d.note) info += `. Ghi chú: ${d.note}`;
            }
            return { id: s.id, name: s.name, data: info };
          });

          const systemPrompt = `Bạn là GV Tiểu học Việt Nam. Hãy viết nhận xét học sinh theo định dạng JSON.
      QUY TẮC CHUNG:
      - Ngôn ngữ: Tiếng Việt, gần gũi, khích lệ. 
      - Cấu trúc: Bắt đầu bằng 'Em...'. Dài theo yêu cầu của giáo viên.
      - Bắt buộc câu nhận xét của mỗi học sinh đều khác nhau.
      - Tuyệt đối không nêu lại tên của học sinh.
      - KHÔNG dùng từ 'Hoàn thành tốt' cho học sinh ở mức Đạt (Đ) hoặc Hoàn thành (H).
      - Tuyệt đối không dùng cụm từ Thầy/cô.
      - KHÔNG lặp lại tên môn học hoặc tên năng lực.
      - Dựa vào 'data' để viết: 
        Mức T (Tốt) thì khen ngợi. 
        Mức Đ/H (Đạt) thì khen ngợi và hướng phát huy. 
        Mức C (Chưa đạt) thì khen ngợi, nêu hạn chế rõ ràng, nêu biện pháp khắc phục cụ thể.
      - Phải trả về duy nhất một mảng JSON các đối tượng có dạng: {"id": "ID_HOC_SINH", "comment": "CÂU_NHẬN_XÉT"}`;

          const userPrompt = `Dữ liệu đánh giá ${viewMode === 'subject' ? 'Môn ' + subName : viewMode}:
      ${JSON.stringify(inputData)}
      
      Yêu cầu thêm của GV: ${aiPrompt}
      Hãy viết nhận xét cho từng học sinh trong danh sách trên theo đúng định dạng JSON yêu cầu.`;

          try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] },
                generationConfig: { responseMimeType: "application/json" }
              })
            });

            const result = await res.json();
            const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (responseText) {
              const parsedResults = JSON.parse(responseText);
              // Cập nhật từng em vào Firestore
              for (const item of parsedResults) {
                if (item.id && item.comment) {
                  await updateCell(item.id, 'comment', item.comment.trim());
                }
              }
            } else {
              console.warn("AI trả về không có responseText", result);
            }
          } catch (e) {
            console.error("Lỗi khi gọi AI hàng loạt:", e);
          }
        }

        setIsGenerating(false);
      };

      const handleSendZalo = (studentId) => {
        if (!isAuthValid) return;
        const stu = students.find(s => s.id === studentId);
        const data = studentData[studentId];
        if (!stu || !data?.comment) return;
        const subName = viewMode === 'subject' ? subjects.find(s => s.id === selectedSubId)?.name : (viewMode === 'competency' ? 'Năng lực chung' : (viewMode === 'quality' ? 'Phẩm chất' : 'Năng lực đặc thù'));
        const message = `✨ TRƯỜNG TIỂU HỌC KHÁNH BÌNH ✨\n💌 THƯ KHEN GỬI GIA ĐÌNH EM: ${stu.name.toUpperCase()}\n---------------------------\n🌈 Lớp: ${classes.find(c=>c.id===selectedClassId)?.name}\n📘 Nội dung: ${subName} (${months.find(m=>m.id===selectedMonthId)?.name})\n\n📝 Nhận xét:\n"${data.comment}"\n\n❤️ Chúc con luôn chăm ngoan!\n\n❤️TRỢ LÝ TIỂU HỌC❤️: https://roboki.vn/`;
        const el = document.createElement('textarea'); el.value = message; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
        setCopySuccess(studentId); setTimeout(() => setCopySuccess(null), 2000); window.open('https://chat.zalo.me/', '_blank');
      };

      const exportExcel = () => {
        if (!students.length || !window.XLSX) return;
        const className = classes.find(c => c.id === selectedClassId)?.name || 'Lớp';
        const monthName = months.find(m => m.id === selectedMonthId)?.name || 'Tháng';
        const subName = viewMode === 'subject' ? subjects.find(s => s.id === selectedSubId)?.name : (viewMode === 'competency' ? 'Năng lực' : (viewMode === 'quality' ? 'Phẩm chất' : 'Năng lực đặc thù'));

        let worksheetData = [
          ["BẢNG NHẬN XÉT ĐÁNH GIÁ HỌC SINH"],
          [`Lớp: ${className} - ${monthName}`],
          [`Nội dung: ${subName}`],
          [""]
        ];

        const currentComponents = viewMode === 'competency' ? GENERAL_COMPETENCIES : (viewMode === 'quality' ? QUALITIES : (viewMode === 'specific' ? SPECIFIC_COMPETENCIES : []));

        if (currentComponents.length > 0) {
          const header = ["STT", "HỌ VÀ TÊN", ...currentComponents.map(c => c.name)];
          if (viewMode === 'subject') header.push("MỨC TỔNG");
          header.push("NHẬN XÉT CHI TIẾT");
          worksheetData.push(header);

          students.forEach((s, i) => {
            const d = studentData[s.id] || {};
            const row = [
              i + 1,
              s.name.toUpperCase(),
              ...currentComponents.map(c => d[`level_${c.id}`] || "")
            ];
            if (viewMode === 'subject') row.push(d.level || "");
            row.push(d.comment || "");
            worksheetData.push(row);
          });
        } else {
          const header = ["STT", "HỌ VÀ TÊN", "MỨC ĐẠT", "NHẬN XÉT CHI TIẾT"];
          worksheetData.push(header);

          students.forEach((s, i) => {
            const d = studentData[s.id] || {};
            const row = [
              i + 1,
              s.name.toUpperCase(),
              d.level || "",
              d.comment || ""
            ];
            worksheetData.push(row);
          });
        }

        const wb = window.XLSX.utils.book_new();
        const ws = window.XLSX.utils.aoa_to_sheet(worksheetData);
        const cols = [{ wch: 5 }, { wch: 25 }];
        const comps = viewMode === 'competency' ? GENERAL_COMPETENCIES : (viewMode === 'quality' ? QUALITIES : (viewMode === 'specific' ? SPECIFIC_COMPETENCIES : []));
        comps.forEach(() => cols.push({ wch: 10 }));
        if (viewMode === 'subject') cols.push({ wch: 10 });
        cols.push({ wch: 80 });
        ws['!cols'] = cols;

        window.XLSX.utils.book_append_sheet(wb, ws, "NhanXet");
        window.XLSX.writeFile(wb, `NhanXet_${className}_${monthName}_${viewMode}.xlsx`);
      };

      // AI prompt speech handlers
      const startAiRecognition = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          alert('Trình duyệt không hỗ trợ nhập giọng nói (SpeechRecognition). Vui lòng dùng Chrome/Edge trên máy tính hoặc Chrome trên Android.');
          return;
        }
        const rec = new (SpeechRecognition)();
        rec.lang = 'vi-VN';
        rec.interimResults = true;
        rec.maxAlternatives = 1;
        rec.continuous = false;

        rec.onstart = () => setAiRecognizing(true);
        rec.onerror = (e) => {
          console.error('AI prompt recognition error', e);
          setAiRecognizing(false);
        };
        rec.onend = () => {
          setAiRecognizing(false);
          aiRecognitionRef.current = null;
        };
        rec.onresult = (evt) => {
          let interim = '';
          let final = '';
          for (let i = evt.resultIndex; i < evt.results.length; ++i) {
            const res = evt.results[i];
            if (res.isFinal) final += res[0].transcript;
            else interim += res[0].transcript;
          }
          if (final) {
            setAiPrompt(prev => (prev ? prev + ' ' : '') + final.trim());
          } else if (interim) {
            // show interim by temporarily appending (do not persist)
            // optional: ignore interim to avoid duplications
          }
        };

        aiRecognitionRef.current = rec;
        try { rec.start(); } catch(e){ console.error(e); }
      };

      const stopAiRecognition = () => {
        const rec = aiRecognitionRef.current;
        if (rec) {
          try { rec.stop(); } catch(e){}
          aiRecognitionRef.current = null;
        }
        setAiRecognizing(false);
      };

      const toggleAiMic = () => {
        if (aiRecognizing) stopAiRecognition();
        else startAiRecognition();
      };

      const SectionBox = ({ label, items, selectedId, onSelect, type, icon: Icon }) => (
        <div className="bg-white p-4 rounded-xl border-2 border-slate-300 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-black text-slate-600 uppercase flex items-center gap-1.5"><Icon size={12}/> {label}</span>
            <div className="flex gap-1">
              {selectedId && (
                <>
                  <button onClick={() => { const item = items.find(i => i.id === selectedId); setEditItem(item); setInputValue(item.name); setModalType(type); }} className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={12}/></button>
                  <button onClick={() => { const item = items.find(i => i.id === selectedId); setConfirmDelete({ type, id: item.id, name: item.name }); }} className="p-1 hover:text-red-600"><Trash2 size={12}/></button>
                </>
              )}
              <button onClick={() => { setEditItem(null); setInputValue(''); setModalType(type); }} className="p-1 text-indigo-500"><Plus size={14}/></button>
            </div>
          </div>
          <select value={selectedId || ''} onChange={(e) => onSelect(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold outline-none">
            <option value="">-- Chọn --</option>
            {items.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        </div>
      );

      if (!isAuthValid) return <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-black">LỖI XÁC THỰC BẢN QUYỀN</div>;

if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <button
        onClick={loginGoogle}
        className="px-8 py-4 bg-white text-black font-black rounded-xl shadow-xl text-lg"
      >
        🔐 ĐĂNG NHẬP TẠI ĐÂY
      </button>
    </div>
  );
}

      const currentComponents = viewMode === 'competency' ? GENERAL_COMPETENCIES : (viewMode === 'quality' ? QUALITIES : (viewMode === 'specific' ? SPECIFIC_COMPETENCIES : []));

      // Drag handlers
      const onRowDragStart = (e, idx) => {
        setDraggingIdx(idx);
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', String(idx)); } catch (err) { /* some browsers */ }
      };
      const onRowDragOver = (e, idx) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      };
      const onRowDrop = async (e, idx) => {
        e.preventDefault();
        const from = draggingIdx !== null ? draggingIdx : (parseInt(e.dataTransfer.getData('text/plain'), 10));
        if (isNaN(from)) { setDraggingIdx(null); return; }
        if (from === idx) { setDraggingIdx(null); return; }

        const newStudents = [...students];
        const [moved] = newStudents.splice(from, 1);
        newStudents.splice(idx, 0, moved);
        setStudents(newStudents);
        setDraggingIdx(null);

        // Persist new order: set 'order' field to index
        try {
          const colRef = col('artifacts', appId, 'public', 'data', 'years', selectedYearId, 'classes', selectedClassId, 'students');
          const batch = db.batch();
          newStudents.forEach((s, i) => {
            const ref = colRef.doc(s.id);
            batch.update(ref, { order: i });
          });
          await batch.commit();
        } catch (e) {
          console.error("Lỗi khi lưu thứ tự học sinh:", e);
        }
      };

      return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-12 font-sans text-left flex flex-col">
          <header className="bg-indigo-900 text-white p-6 shadow-xl border-b-4 border-indigo-700">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center w-full gap-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-xl"><GraduationCap size={32}/></div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-black uppercase leading-none">ĐÁNH GIÁ THƯỜNG XUYÊN</h1>
                  <span className="text-indigo-300 text-[12px] font-bold uppercase mt-1 italic">TIỂU HỌC KHÁNH BÌNH - DẪN LỐI TƯƠNG LAI</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-indigo-950/50 p-1 rounded-xl gap-1">
                   {[
                     {id: 'subject', label: 'Môn học'},
                     {id: 'competency', label: 'Năng lực chung'},
                     {id: 'quality', label: 'Phẩm chất'},
                     {id: 'specific', label: 'NL Đặc thù'}
                   ].map(m => (
                     <button key={m.id} onClick={() => setViewMode(m.id)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === m.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-300 hover:text-white'}`}>
                       {m.label}
                     </button>
                   ))}
                </div>

                <div className="relative">
                  <button onClick={() => { setShowApiKeyModal(true); setApiKeyInput(localStorage.getItem('ai_api_key') || ''); setApiKeyMissingNote(false); }} className="px-3 py-2 bg-yellow-400 text-black font-bold rounded-lg shadow">
                    <Settings size={12}/> MÃ KHÓA
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SectionBox label="Năm học" icon={Calendar} items={years} selectedId={selectedYearId} onSelect={setSelectedYearId} type="year" />
            <SectionBox label="Lớp học" icon={LayoutGrid} items={classes} selectedId={selectedClassId} onSelect={setSelectedClassId} type="class" />
            <SectionBox label="Tháng" icon={Calendar} items={months} selectedId={selectedMonthId} onSelect={setSelectedMonthId} type="month" />
            {viewMode === 'subject' ? <SectionBox label="Môn học" icon={BookOpen} items={subjects} selectedId={selectedSubId} onSelect={setSelectedSubId} type="subject" /> : <div className="bg-indigo-50 p-4 rounded-xl border-2 border-indigo-200 shadow-sm flex items-center justify-center font-black text-indigo-700 text-[10px] uppercase gap-2">{viewMode === 'quality' ? <Star size={14}/> : <User size={14}/>} {viewMode === 'competency' ? 'Năng lực chung' : (viewMode === 'quality' ? 'Phẩm chất' : 'NL Đặc thù')}</div>}
          </div>

          <main className="max-w-7xl mx-auto px-4 md:px-6 flex-1">
            {selectedYearId && selectedClassId && selectedMonthId && (viewMode !== 'subject' || selectedSubId) ? (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border-2 border-slate-300 shadow-sm flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full text-left">
                      <label className="text-[10px] font-black text-slate-500 uppercase mb-2 block">Lưu ý chung của GV</label>
                      <div className="relative">
                        <Sparkles size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"/>
                        <input className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl pl-12 pr-14 py-4 text-sm font-semibold outline-none" placeholder="VD: Nhấn mạnh tính tự giác, tinh thần trách nhiệm..." value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}/>
                        <button title={ (window.SpeechRecognition || window.webkitSpeechRecognition) ? (aiRecognizing ? 'Dừng ghi âm' : 'Nhập giọng nói') : 'Trình duyệt không hỗ trợ giọng nói' } onClick={toggleAiMic} disabled={!(window.SpeechRecognition || window.webkitSpeechRecognition)} className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 text-sm rounded-md ${aiRecognizing ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Mic size={16}/>
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={runBulkAI} disabled={isGenerating || students.length === 0} className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-black text-xs hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 uppercase shadow-lg">
                        {isGenerating ? <Loader2 size={18} className="spin" /> : <Wand2 size={18} />} Nhận xét cả lớp
                      </button>
                      <button onClick={() => { setEditItem(null); setBulkInput(''); setModalType('student'); }} className="p-4 bg-slate-800 text-white rounded-xl shadow-lg hover:bg-black"><UserPlus size={20}/></button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-100 gap-3">
                    <div className="flex gap-2">
                      <button onClick={() => setShowLevel(!showLevel)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all border ${showLevel ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-400 border-slate-200'}`}>
                        {showLevel ? <EyeOff size={14}/> : <Eye size={14}/>} {showLevel ? 'Ẩn mức đạt' : 'Hiện mức đạt'}
                      </button>
                      <button onClick={() => setShowNote(!showNote)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all border ${showNote ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-400 border-slate-200'}`}>
                        {showNote ? <EyeOff size={14}/> : <Eye size={14}/>} {showNote ? 'Ẩn ghi chú' : 'Hiện ghi chú'}
                      </button>
                    </div>
                    <button onClick={exportExcel} disabled={students.length === 0} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-black uppercase hover:bg-emerald-700 shadow-md transition-all disabled:opacity-50">
                      <Download size={14}/> Tải Excel
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border-2 border-slate-400 shadow-2xl overflow-hidden mb-8">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[1200px]">
                      <thead>
                        <tr className="bg-slate-200 border-b-2 border-slate-400">
                          <th className="p-4 text-center text-[10px] font-black uppercase w-12 border-r border-slate-400 sticky left-0 bg-slate-200 z-10">STT</th>
                          <th className="p-4 text-center text-[10px] font-black uppercase w-48 border-r border-slate-400 sticky left-12 bg-slate-200 z-10">Học sinh</th>
                          {showLevel && currentComponents.map(c => (
                            <th key={c.id} className="p-4 text-center text-[9px] font-black uppercase border-r border-slate-400 w-24">{c.name}</th>
                          ))}
                          {showLevel && viewMode === 'subject' && (
                            <th className="p-4 text-center text-[10px] font-black uppercase w-32 border-r border-slate-400">Mức Đạt</th>
                          )}
                          {showNote && <th className="p-4 text-center text-[10px] font-black uppercase w-48 border-r border-slate-400">Ghi chú</th>}
                          <th className="p-4 text-center text-[10px] font-black uppercase min-w-[400px]">Nhận xét chi tiết</th>
                          <th className="p-4 w-24 text-center text-[10px] font-black uppercase">Gửi</th>
                          <th className="p-4 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y-2 divide-slate-300">
                        {students.map((stu, idx) => {
                          const isInactive = stu.status === 'transferred' || stu.status === 'dropped';
                          return (
                          <tr
                            key={stu.id}
                            className={`hover:bg-indigo-50/50 transition-all ${draggingIdx === idx ? 'dragging' : ''} ${isInactive ? 'bg-red-50 text-red-700' : ''}`}
                            draggable
                            onDragStart={(e) => onRowDragStart(e, idx)}
                            onDragOver={(e) => onRowDragOver(e, idx)}
                            onDrop={(e) => onRowDrop(e, idx)}
                          >
                            <td className="p-3 text-center text-xs font-bold text-slate-400 border-r border-slate-400 sticky left-0 bg-slate-50">
                              <div className="flex items-center justify-center gap-2">
                                <span className="drag-handle" title="Kéo để thay đổi vị trí">☰</span>
                                <span>{idx + 1}</span>
                              </div>
                            </td>
                            <td className="p-3 border-r border-slate-400 text-left sticky left-12 bg-white z-0">
                              <button onClick={() => openEditStudent(stu)} className={`text-left w-full ${isInactive ? 'font-black text-red-700' : 'font-black text-slate-800'} text-sm uppercase`}>{stu.name}</button>
                              {isInactive && <div className="text-[10px] mt-1 font-bold uppercase">{stu.status === 'transferred' ? 'Đã chuyển trường' : 'Bỏ học'}</div>}
                            </td>

                            {showLevel && currentComponents.map(c => (
                              <td key={c.id} className="p-1 border-r border-slate-400">
                                <div className="flex justify-center gap-0.5">
                                  {['T', 'Đ', 'C'].map(lv => (
                                    <button
                                      key={lv}
                                      onClick={() => updateCell(stu.id, `level_${c.id}`, lv)}
                                      disabled={isInactive}
                                      className={`w-6 h-6 rounded font-black text-[9px] transition-all ${studentData[stu.id]?.[`level_${c.id}`] === lv ? (isInactive ? 'bg-red-600 text-white' : 'bg-indigo-600 text-white shadow-sm') : (isInactive ? 'bg-red-100 text-red-400' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}`}
                                    >{lv}</button>
                                  ))}
                                </div>
                              </td>
                            ))}

                            {showLevel && viewMode === 'subject' && (
                              <td className="p-3 border-r border-slate-400">
                                <div className="flex justify-center gap-1">
                                  {['T', 'H', 'C'].map(lv => (
                                    <button key={lv} onClick={() => updateCell(stu.id, 'level', lv)} disabled={isInactive} className={`w-8 h-8 rounded-lg font-black text-[10px] transition-all ${studentData[stu.id]?.level === lv ? (isInactive ? 'bg-red-600 text-white' : 'bg-indigo-600 text-white shadow-md') : (isInactive ? 'bg-red-100 text-red-400' : 'bg-slate-100 text-slate-400 hover:bg-slate-200')}`}>{lv}</button>
                                  ))}
                                </div>
                              </td>
                            )}

                            {showNote && <td className="p-3 border-r border-slate-400"><EditableCell value={studentData[stu.id]?.note} onSave={(val) => updateCell(stu.id, 'note', val)} className="w-full bg-transparent text-xs font-bold text-indigo-700 outline-none text-left" /></td>}

                            <td className="p-3 text-left">
                              <EditableCell value={studentData[stu.id]?.comment} onSave={(val) => updateCell(stu.id, 'comment', val)} className="w-full bg-transparent text-sm font-medium border-none outline-none text-slate-700 text-left leading-relaxed" />
                            </td>

                            <td className="p-3 text-center border-l border-slate-200">
                              <button disabled={!studentData[stu.id]?.comment} onClick={() => handleSendZalo(stu.id)} className={`p-2.5 rounded-full mx-auto shadow-sm transition-all ${copySuccess === stu.id ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white disabled:opacity-30'}`}>
                                {copySuccess === stu.id ? <CheckCircle2 size={18} /> : <span style={{display:'inline-block', width:18, height:18}}><ZaloIcon size={18} /></span>}
                              </button>
                            </td>
                            <td className="p-3 text-center"><button onClick={() => setConfirmDelete({ type: 'student', id: stu.id, name: stu.name })} className="text-slate-300 hover:text-red-500"><Trash2 size={14}/></button></td>
                          </tr>
                        )})}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-400 font-black text-slate-400 uppercase">Chọn đầy đủ thông tin để bắt đầu đánh giá</div>}
          </main>

          <footer className="max-w-7xl mx-auto w-full px-6 py-4 mt-8 bg-white/80 rounded-t-3xl border-t border-slate-200">
            <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <div className="text-left">{AUTHOR_NAME} • {AUTHOR_PHONE}</div>
                <div className="text-right">🛡️© {new Date().getFullYear()}.thkb. All rights reserved.</div>
            </div>
          </footer>

          {/* modal / confirm UI (kept) */}
          {modalType && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
              <div className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl text-left">
                <h3 className="text-xl font-black uppercase text-slate-800 mb-6">{editItem ? "Sửa" : "Thêm mới"}</h3>
                {modalType === 'student' ? <textarea autoFocus className="w-full h-64 p-4 bg-slate-50 border-2 border-slate-300 rounded-xl mb-6 text-left font-bold outline-none" placeholder="Dán danh sách học sinh (mỗi tên một dòng)..." value={bulkInput} onChange={e => setBulkInput(e.target.value)}/> : <input autoFocus className="w-full p-4 bg-slate-50 border-2 border-slate-300 rounded-xl font-bold mb-6 text-left outline-none" value={inputValue} onChange={e => setInputValue(e.target.value)}/>}
                <div className="flex gap-4"><button onClick={() => setModalType(null)} className="flex-1 py-4 font-black text-slate-400 uppercase text-[10px]">Hủy</button><button onClick={async () => {
                  if (modalType === 'student') {
                    if (!bulkInput.trim()) return;
                    const names = bulkInput.split('\n').map(n => n.trim()).filter(n => n !== '');
                    const colRef = col('artifacts', appId, 'public', 'data', 'years', selectedYearId, 'classes', selectedClassId, 'students');
                    const base = Date.now();
                    for (let i = 0; i < names.length; i++) {
                      const name = names[i];
                      try { await colRef.add({ name, createdAt: Date.now(), order: base + i, status: 'active' }); } catch(e){ console.error(e); }
                    }
                    setBulkInput(''); setModalType(null);
                  } else {
                    if (!inputValue.trim()) return;
                    const colName = modalType === 'year' ? 'years' : modalType === 'class' ? 'classes' : modalType === 'month' ? 'months' : 'subjects';
                    const colRef = col('artifacts', appId, 'public', 'data', colName);
                    if (editItem) {
                      try { await db.collection('artifacts').doc(appId).collection('public').doc('data').collection(colName).doc(editItem.id).update({ name: inputValue }); } catch(e){ console.error(e); }
                    } else {
                      try { await colRef.add({ name: inputValue, createdAt: Date.now() }); } catch(e){ console.error(e); }
                    }
                    setInputValue(''); setModalType(null);
                  }
                }} className="flex-[2] py-4 bg-indigo-600 text-white font-black rounded-xl uppercase text-[10px]">Lưu</button></div>
              </div>
            </div>
          )}

          {confirmDelete && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
              <div className="bg-white w-full max-w-sm rounded-3xl p-8 text-center shadow-2xl">
                <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4"><ShieldAlert size={32} /></div>
                <h3 className="text-lg font-black mb-2 uppercase">Xác nhận xóa</h3>
                <p className="text-slate-500 text-sm mb-6">Bạn có chắc muốn xóa <span className="text-red-600 font-bold">"{confirmDelete.name}"</span> không?</p>
                <div className="flex gap-4"><button onClick={() => setConfirmDelete(null)} className="flex-1 py-4 font-black text-slate-400 uppercase text-[10px]">Hủy</button><button onClick={async () => {
                  try {
                    if (confirmDelete.type === 'student') {
                      await col('artifacts', appId, 'public', 'data', 'years', selectedYearId, 'classes', selectedClassId, 'students').doc(confirmDelete.id).delete();
                    } else {
                      const colName = confirmDelete.type === 'year' ? 'years' : confirmDelete.type === 'class' ? 'classes' : confirmDelete.type === 'month' ? 'months' : 'subjects';
                      await col('artifacts', appId, 'public', 'data', colName).doc(confirmDelete.id).delete();
                    }
                  } catch(e) { console.error(e); }
                  setConfirmDelete(null);
                }} className="flex-1 py-4 bg-red-600 text-white font-black rounded-xl uppercase text-[10px]">Xóa</button></div>
              </div>
            </div>
          )}

          {showApiKeyModal && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70">
              <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl">
                <h3 className="text-lg font-black mb-4">KEY</h3>
                <p className="text-sm text-slate-600 mb-3">Vui long nhập Mã khóa để sử dụng chức năng gọi AI (Generative Language).</p>

                {apiKeyMissingNote && (
                  <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm text-slate-800">
                    Bạn chưa nhập Mã khóa. Vui lòng nhập Mã khóa để sử dụng chức năng "Nhận xét cả lớp".<br/>
                    Nếu cần hỗ trợ, liên hệ Thầy Kim — ĐT: <span className="font-black">0964567806</span>
                  </div>
                )}

                <input value={apiKeyInput} onChange={e=>setApiKeyInput(e.target.value)} className="w-full p-3 border rounded-md mb-4" placeholder="Nhập Mã key..."/>
                <div className="flex gap-3">
                  <button onClick={()=>{ setShowApiKeyModal(false); setApiKeyMissingNote(false); }} className="flex-1 py-2 bg-slate-100 font-black rounded">Hủy</button>
                  <button onClick={()=>{ localStorage.setItem('ai_api_key', apiKeyInput.trim()); setShowApiKeyModal(false); setApiKeyMissingNote(false); }} className="flex-1 py-2 bg-indigo-600 text-white font-black rounded">Lưu</button>
                </div>
              </div>
            </div>
          )}

          {/* NEW: Blocking modal when no student has any level selected (text updated) */}
          {showSelectLevelModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm">
              <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl">
                <div className="w-16 h-16 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4"><Sparkles size={32} /></div>
                <h3 className="text-lg font-black mb-2 uppercase">Thiếu thông tin</h3>
                <p className="text-slate-600 text-sm mb-6">Vui lòng chọn mức đạt ít nhất 1 học sinh để nhận xét.</p>
                <div className="flex gap-4">
                  <button onClick={() => setShowSelectLevelModal(false)} className="flex-1 py-3 bg-indigo-600 text-white font-black rounded-xl uppercase text-[12px]">Đóng</button>
                </div>
              </div>
            </div>
          )}

          {/* NEW: Edit student modal */}
          {editStudentModalOpen && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
              <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl text-left">
                <h3 className="text-xl font-black uppercase text-slate-800 mb-4">Sửa thông tin học sinh</h3>
                <label className="text-xs font-black text-slate-500 uppercase mb-1">Họ và tên</label>
                <input value={editStudentForm.name} onChange={(e) => setEditStudentForm(s => ({ ...s, name: e.target.value }))} className="w-full p-3 border rounded-md mb-3" />
                <label className="text-xs font-black text-slate-500 uppercase mb-1">Trạng thái</label>
                <select value={editStudentForm.status} onChange={(e) => setEditStudentForm(s => ({ ...s, status: e.target.value }))} className="w-full p-3 border rounded-md mb-3">
                  <option value="active">Hoạt động</option>
                  <option value="transferred">Chuyển trường</option>
                  <option value="dropped">Bỏ học</option>
                </select>
                <label className="text-xs font-black text-slate-500 uppercase mb-1">Ghi chú trạng thái (lý do / trường mới)</label>
                <input value={editStudentForm.statusNote} onChange={(e) => setEditStudentForm(s => ({ ...s, statusNote: e.target.value }))} className="w-full p-3 border rounded-md mb-4" placeholder="Ví dụ: Chuyển đến trường ABC" />
                <div className="flex gap-3">
                  <button onClick={() => setEditStudentModalOpen(false)} className="flex-1 py-2 bg-slate-100 font-black rounded">Hủy</button>
                  <button onClick={saveEditStudent} className="flex-1 py-2 bg-indigo-600 text-white font-black rounded">Lưu</button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };


    ReactDOM.createRoot(document.getElementById('root')).render(<App />);








