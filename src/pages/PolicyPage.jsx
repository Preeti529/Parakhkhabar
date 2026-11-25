import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import { updatePageMeta } from '../utils/seo';
import { Shield, FileCheck, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

const policyContents = {
  'ownership-and-funding': {
    title: 'स्वामित्व एवं फंडिंग (Ownership & Funding)',
    content: (
      <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
        <p>
          <strong>परख खबर (Parakh Khabar)</strong> एक स्वतंत्र एवं पंजीकृत डिजिटल समाचार संस्थान है, जिसका मुख्यालय बलिया, उत्तर प्रदेश में स्थित है।
        </p>
        <h3 className="text-lg font-bold text-gray-900 mt-4">स्वामित्व विवरण:</h3>
        <p>
          यह पोर्टल राज पाण्डेय द्वारा निजी स्वामित्व एवं प्रबंधकीय नियंत्रण के अंतर्गत संचालित किया जाता है। संस्थान का एकमात्र उद्देश्य निष्पक्ष, सटीक और जनसरोकार से जुड़ी पत्रकारिता को बढ़ावा देना है।
        </p>
        <h3 className="text-lg font-bold text-gray-900 mt-4">राजस्व एवं फंडिंग का स्रोत:</h3>
        <p>
          परख खबर का संचालन मुख्य रूप से डिजिटल विज्ञापनों (Google AdSense एवं अधिकृत प्रायोजित सामग्री) तथा स्वतंत्र संपादकीय प्रयासों के माध्यम से किया जाता है। किसी भी राजनीतिक दल, दबाव समूह या कॉर्पोरेट घराने से कोई प्रत्यक्ष या अप्रत्यक्ष वित्तीय सहायता प्राप्त नहीं की जाती है।
        </p>
      </div>
    )
  },
  'ethics-policy': {
    title: 'संपादकीय आचार संहिता (Ethics Policy)',
    content: (
      <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
        <p>
          परख खबर प्रेस काउंसिल ऑफ इंडिया (Press Council of India) के नैतिक मानकों एवं आचार संहिता का अक्षरशः पालन करता है।
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>सत्यता एवं निष्पक्षता:</strong> किसी भी खबर को प्रकाशित करने से पहले उसके प्राथमिक स्रोतों की पुष्टि की जाती है।</li>
          <li><strong>स्वतंत्रता:</strong> संपादकीय नीति किसी भी बाहरी दबाव या राजनीतिक प्रभाव से पूर्णतः मुक्त है।</li>
          <li><strong>हितों का टकराव:</strong> हमारे पत्रकार किसी भी ऐसे विषय पर रिपोर्टिंग नहीं करते जिसमें उनका कोई व्यक्तिगत या व्यावसायिक हित शामिल हो।</li>
          <li><strong>गोपनीयता का सम्मान:</strong> संवेदनशील मामलों, पीड़ितों एवं नाबालिगों की पहचान कानून के अनुसार पूर्णतः सुरक्षित रखी जाती है।</li>
        </ul>
      </div>
    )
  },
  'fact-checking-policy': {
    title: 'तथ्य जांच नीति (Fact Checking Policy)',
    content: (
      <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
        <p>
          परख खबर फेक न्यूज और भ्रामक जानकारियों के खिलाफ शून्य सहनशीलता (Zero Tolerance) की नीति अपनाता है।
        </p>
        <h3 className="text-lg font-bold text-gray-900 mt-4">तथ्य जांच प्रक्रिया:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>सत्यापन:</strong> वायरल दावों, सोशल मीडिया पोस्ट्स और सरकारी घोषणाओं की आधिकारिक दस्तावेजों से पुष्टि।</li>
          <li><strong>स्थानिक पड़ताल:</strong> बलिया, लखनऊ एवं अन्य जिलों में मौजूद हमारे जमीनी संवाददाताओं द्वारा भौतिक सत्यापन।</li>
          <li><strong>सुधार नीति (Correction Policy):</strong> यदि किसी प्रकाशित समाचार में कोई तथ्यात्मक त्रुटि पाई जाती है, तो उसे त्वरित रूप से संशोधित किया जाता है और पाठकों के लिए संशोधन नोट (Correction Note) स्पष्ट रूप से अंकित किया जाता है।</li>
        </ol>
      </div>
    )
  },
  'privacy-policy': {
    title: 'गोपनीयता नीति (Privacy Policy)',
    content: (
      <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
        <p>
          परख खबर अपने पाठकों की डिजिटल गोपनीयता की रक्षा के लिए प्रतिबद्ध है। यह नीति स्पष्ट करती है कि जब आप हमारी वेबसाइट का उपयोग करते हैं तो हम आपकी जानकारी का संग्रह और उपयोग कैसे करते हैं।
        </p>
        <h3 className="text-lg font-bold text-gray-900 mt-4">डेटा संग्रह एवं कुकीज:</h3>
        <p>
          हम उपयोगकर्ता अनुभव को बेहतर बनाने के लिए मानक कुकीज और एनालिटिक्स टूल्स का उपयोग करते हैं। हम आपकी किसी भी व्यक्तिगत जानकारी को किसी तीसरे पक्ष को नहीं बेचते हैं।
        </p>
      </div>
    )
  },
  'terms-and-conditions': {
    title: 'नियम एवं शर्तें (Terms & Conditions)',
    content: (
      <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
        <p>
          परख खबर पोर्टल का उपयोग करने से पहले कृपया इन नियमों एवं शर्तों को ध्यानपूर्वक पढ़ें। इस वेबसाइट का उपयोग करने का अर्थ है कि आप इन शर्तों से पूर्णतः सहमत हैं।
        </p>
        <p>
          वेबसाइट पर प्रकाशित सभी पाठ्य सामग्री, ग्राफिक्स, लोगो और छवियां कॉपीराइट कानूनों के तहत संरक्षित हैं। बिना पूर्व लिखित अनुमति के किसी भी सामग्री का अनधिकृत व्यावसायिक पुनःप्रकाशन प्रतिबंधित है।
        </p>
      </div>
    )
  },
  'about-us': {
    title: 'हमारे बारे में (About Us)',
    content: (
      <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
        <p>
          <strong>परख खबर</strong> उत्तर प्रदेश के बलिया से संचालित होने वाला एक प्रमुख और विश्वसनीय हिंदी डिजिटल समाचार माध्यम है।
        </p>
        <p>
          हमारा लक्ष्य ग्रामीण और कस्बाई अंचलों से लेकर राज्य, राष्ट्रीय और अंतरराष्ट्रीय स्तर की महत्वपूर्ण घटनाओं को सीधे पाठकों तक पहुंचाना है। हम सनसनीखेज पत्रकारिता से दूर रहकर गंभीर, संतुलित और जनहितैषी मुद्दों को प्राथमिकता देते हैं।
        </p>
      </div>
    )
  },
  'contact-us': {
    title: 'संपर्क करें (Contact Us)',
    content: (
      <div className="space-y-6 text-sm sm:text-base text-gray-800 leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#e01b24]" />
              <span>कार्यालय का पता:</span>
            </h4>
            <p className="text-gray-600">
              परख खबर मीडिया नेटवर्क<br />
              बलिया, उत्तर प्रदेश - 277001, भारत
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#e01b24]" />
              <span>संपादकीय संपर्क:</span>
            </h4>
            <p className="text-gray-600">
              संपादक: editor@parakhkhabar.com<br />
              सामान्य पूछताछ: contact@parakhkhabar.com<br />
              विज्ञापन: advt@parakhkhabar.com
            </p>
          </div>
        </div>

        {/* Contact form placeholder */}
        <div className="bg-white p-6 border border-gray-200 rounded">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            संपादकीय टीम को संदेश भेजें
          </h3>
          <form onSubmit={(e) => { e.preventDefault(); alert('संदेश सफलता पूर्वक भेजा गया। हम जल्द ही आपसे संपर्क करेंगे।'); }} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">आपका नाम</label>
              <input type="text" required className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="पूरा नाम दर्ज करें" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">ईमेल पता</label>
              <input type="email" required className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">संदेश</label>
              <textarea rows={4} required className="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="अपना संदेश या समाचार टिप यहाँ लिखें..."></textarea>
            </div>
            <button type="submit" className="bg-[#e01b24] text-white font-bold px-6 py-2.5 rounded text-sm hover:bg-[#b7141b] transition-colors">
              संदेश भेजें
            </button>
          </form>
        </div>
      </div>
    )
  },
  'gdpr': {
    title: 'GDPR अनुपालन नीति (GDPR Compliance)',
    content: (
      <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
        <p>
          परख खबर वैश्विक स्तर पर यूरोपीय संघ के सामान्य डेटा संरक्षण विनियमन (GDPR) के सिद्धांतों का सम्मान करता है। हम यह सुनिश्चित करते हैं कि किसी भी उपयोगकर्ता के डेटा का संकलन पारदर्शी और उपयोगकर्ता की सहमति के आधार पर हो।
        </p>
      </div>
    )
  },
  'disclaimer': {
    title: 'अस्वीकरण (Disclaimer)',
    content: (
      <div className="space-y-4 text-sm sm:text-base text-gray-800 leading-relaxed">
        <p>
          परख खबर पोर्टल पर उपलब्ध सामग्री केवल सूचनात्मक और शैक्षणिक उद्देश्यों के लिए है। किसी भी समाचार या विश्लेषण को बिना विधिक या विशेषज्ञ परामर्श के अंतिम नहीं माना जाना चाहिए।
        </p>
      </div>
    )
  }
};

const PolicyPage = () => {
  const { policySlug } = useParams();

  const data = policyContents[policySlug] || {
    title: 'नीति एवं दिशा-निर्देश',
    content: <p>विवरण शीघ्र ही उपलब्ध कराया जाएगा।</p>
  };

  useEffect(() => {
    updatePageMeta({
      title: `${data.title} | परख खबर`,
      description: `परख खबर की ${data.title} से संबंधित आधिकारिक नीति और विवरण।`
    });
    window.scrollTo(0, 0);
  }, [policySlug, data.title]);

  const breadcrumbs = [
    { name: 'नीतियां', path: '/policy/about-us' },
    { name: data.title, path: `/policy/${policySlug}` }
  ];

  return (
    <div className="site-container my-6">
      <Breadcrumbs items={breadcrumbs} />

      <main className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded border border-gray-200 shadow-sm">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 border-b-2 border-[#e01b24] pb-4 mb-6">
          {data.title}
        </h1>

        <div className="prose max-w-none">
          {data.content}
        </div>
      </main>
    </div>
  );
};

export default PolicyPage;
