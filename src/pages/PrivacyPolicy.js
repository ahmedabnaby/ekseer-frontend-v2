import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

export const PrivacyPolicy = () => {

    const { state } = useLocation();

    return (
        <>
            <Container className="mt-5">
                <div className={state?.currentLanguage === "en" ? "title" : "title-ar"}>
                    <div className={state?.currentLanguage === "en" ? "title" : "title-ar"} style={{ width: '94%' }}>
                        {state?.currentLanguage === "en" ?
                            <div>
                                {/* /ABOUT US PAGE ENGLISH */}
                                <div className='ekseerForm text-left'>
                                    <h2 style={{ lineHeight: '28px' }}>Privacy<span id="cutomText2">&nbsp;policy:</span></h2>
                                    <h4>When you use any telehealth and telecommunications services,
                                        you expressly agree to our use of your personal information in accordance with this Privacy Policy.</h4>
                                </div>
                                <div className='mt-3 ekseerForm text-left'>
                                    <h2 style={{ lineHeight: '28px' }}>Medical Cloud's <span id="cutomText2">&nbsp;privacy principles:</span>
                                        <br />
                                        Compliance:
                                    </h2>

                                    <h4>
                                        We respect your privacy and are committed to protecting it through our
                                        compliance with all regulations to protect confidential data in Kingdom Of Saudi Arabia.
                                    </h4>
                                </div>
                                <div className='mt-3 ekseerForm text-left' >
                                    <h2 style={{ lineHeight: '28px' }}>1- Medical Cloud’s <span id="cutomText2">&nbsp;privacy policy:</span>
                                        <br />
                                        Data collection and use:
                                    </h2>

                                    <ul>
                                        <li>Personal information: information through which you can be identified such as </li>
                                        <ul>
                                            <li>
                                                Name
                                            </li>
                                            <li>
                                                Age
                                            </li>
                                            <li>
                                                Gender
                                            </li>
                                            <li>
                                                Contact number
                                            </li>
                                            <li>
                                                National (identity/residence etc.)
                                            </li>
                                        </ul>
                                        <li>We may use your personal information to contact you directly to provide you with information about the services you have requested from us or that we feel may be of interest to you.</li>
                                        <li>Health information: including medical history and treatments currently or previously used</li>
                                        <li>Financial information: for example, credit card or cashier's card details</li>
                                        <li>Information related to your order and purchase of or access to a service such as purchase records, delivery details, payment receipts, etc.</li>
                                        <li>Any feedback or comments you have made.</li>
                                        <li>Information about any health service provided by your attending physician</li>
                                    </ul>
                                    <h4 className='mt-4'>
                                        Diagnosis and treatment depend on the information provided by you. If you provide inaccurate or incomplete information, this may have negative consequences for the health care provided
                                    </h4>
                                </div>
                                <div className='mt-3 ekseerForm text-left' >
                                    <h2 style={{ lineHeight: '28px' }}>Consulting <span id="cutomText2">&nbsp;privacy:</span></h2>
                                    <h4>The doctor is contacted using a video or audio connection directly using your smartphone or web browser. Your personal
                                        conversations and questions are conducted directly with your doctor to provide the appropriate health service for
                                        your digital consultation status. Your personal and health information is shared with the doctor during
                                        the consultation securely and confidentially.
                                    </h4>
                                </div>
                                <div className='ekseerForm text-left'>
                                    <h2 style={{ lineHeight: '28px' }}>How<span id="cutomText2">&nbsp;are you protected:</span></h2>
                                    <h4>All personal information that may indicate your identity is concealed from others,
                                        including complete confidentiality in video and audio calls.</h4>
                                </div>
                                <div className='ekseerForm text-left'>
                                    <h2 style={{ lineHeight: '28px' }}>We<span id="cutomText2">&nbsp;are here to help and facilitate your healthy choices:</span></h2>
                                    <h4>To assist you and provide a health service that is appropriate to your health situation, the relevant
                                        data is used to facilitate the required health services. Moreover, we may employ your information to contact you for
                                        follow-up purposes in the event of any technical
                                        difficulties or other disruptions that may interrupt the consultation session. </h4>
                                </div>
                                <div className='ekseerForm text-left'>
                                    <h2 style={{ lineHeight: '28px' }}>Safety:</h2>
                                    <h4>
                                        At Medical Cloud Comppany, all information is protected and secured in accordance with the required standards.
                                        We use technology and security policies to preserve your privacy and ensure that your information is protected and that no personal information is used for external marketing or any third party.
                                        Security measures are designed to prevent unauthorized access and access to your personal information is limited to employees whose work needs to know that information and who are subject to a confidentiality duty.

                                    </h4>
                                </div>
                                <div className='ekseerForm text-left mb-4'>
                                    <h2 style={{ lineHeight: '28px' }}>2- User rights:</h2>
                                    <h4>
                                        You control your privacy. Medical Cloud Company ® is designed to keep your information secure and confidential.
                                        You can add, delete or edit any of your health information in your profile at any time. You are also entitled
                                        to know what personal information we collect and how it is used. We practice
                                        transparency and indicate what information is used in the privacy policy.
                                    </h4>
                                </div>
                            </div>
                            :
                            <>
                                {/* /ABOUT US PAGE ARABIIC */}

                                <div className='ekseerForm text-right'>
                                    <h2 id='bB'>سياسة الخصوصية</h2>
                                    <h4>
                                        عند استخدامك لأيّ من خدمات الرعاية الصحية عن بُعد والطب الاتصالي، فإنك توافق صراحةً على استخدامنا لمعلوماتك الشخصية وفقاً لسياسة الخصوصية هذه
                                    </h4>
                                </div>
                                <div className='ekseerForm mt-5 text-right' id='formAr'>
                                    <h2 id='bB'>مبدأ السحابة الطبية في الخصوصية
                                        <br />
                                        الامتثال
                                    </h2>
                                    <h4>
                                        نحن نحترم خصوصيتك و نلتزم بحمايتها من خلال امتثالنا و تقيدنا بكافة الأنظمة لحماية البيانات السرية بالمملكة العربية السعودية
                                    </h4>
                                </div>
                                <div className='ekseerForm mt-5 text-right' id='formAr' dir='rtl'>
                                    <h2 id='bB'>
                                        1. سياسة الخصوصية في  السحابة الطبية
                                        <br />
                                        جمع البيانات واستخدامها:
                                    </h2>
                                    <ul>
                                        <li>	المعلومات الشخصية
                                            المعلومات التي يمكن من خلالها تحديد هويتك مثل
                                        </li>
                                        <ul className='mr-5'>
                                            <li>الاسم</li>
                                            <li>العمر</li>
                                            <li>الجنس</li>
                                            <li>رقم التواصل</li>
                                            <li>الهوية الوطنية / الإقامة وما إلى ذلك </li>
                                        </ul>
                                        <li>وقد نستخدم معلوماتك الشخصية للاتصال بك مباشرة لتزويدك بمعلومات حول الخدمات التي طلبتها منا أو التي نشعر أنها قد تهمك</li>
                                        <li>المعلومات الصحية: بما يشمل في ذلك التاريخ الطبي والعلاجات المستخدمة حاليا او سابقا</li>
                                        <li>المعلومات المالية: على سبيل المثال تفاصيل بطاقة الائتمان أو بطاقة الصراف</li>
                                        <li>المعلومات المتعلقة بطلبك وشرائك لخدمة أو الولوج إليها مثل سجلات الشراء وتفاصيل التوصيل وإيصالات الدفع وما إلى ذلك</li>
                                        <li>أي ملاحظات أو تعليقات قمت بتقديمها.</li>
                                        <li>معلومات عن أي خدمة من الخدمات الصحية التي يقدمها الطبيب المعالج لك
                                            يعتمد التشخيص و العلاج على المعلومات المقدمة من قبلك، ففي حال تقديم معلومات غير دقيقة او غير كاملة قد يؤدي ذلك الى نتائج سلبية على الرعاية الصحية المقدمة
                                        </li>
                                    </ul>
                                </div>
                                <div className='ekseerForm mt-5 text-right' dir='rtl'>
                                    <h2 id='bB'>خصوصية الاستشارات:</h2>
                                    <h4>يتم التواصل مع الطبيب باستخدام اتصال الفيديو أو الصوتي مباشرة باستخدام هاتفك الذكي أو متصفح الويب. محادثاتك واسئلتك الشخصية تتم مباشرة مع طبيبك لتقديم الخدمة الصحية المناسبة لحالتك في الاستشارة الرقمية. معلوماتك الشخصية و الصحية يتم مشاركتها مع الطبيب أثناء الاستشارة بشكل آمن وسري</h4>
                                </div>
                                <div className='ekseerForm mt-5 text-right'>
                                    <h2 id='bB'>كيف يتم حمايتك</h2>
                                    <h4>
                                        يتم إخفاء جميع المعلومات الشخصية التي قد تشير الى هويتك عن الآخرين. بما في ذلك السرية التامة في مكالمات الفيديو والصوتية
                                    </h4>
                                </div>
                                <div className='ekseerForm mt-5 text-right'>
                                    <h2 id='bB'>نحن هنا للمساعدة وتسهيل اختياراتك الصحية</h2>
                                    <h4>
                                        لمساعدتك وتقديم الخدمة الصحية بشكل ملائم لوضعك الصحي يتم استخدام البيانات المتعلقة بذلك لتسهيل الخدمات الصحية المطلوبة أيضا يمكننا استخدام معلوماتك بغرض التواصل معك للمتابعة إذا تم إنهاء الجلسة الاستشارية بسبب عطل فني أو لسبب آخر
                                    </h4>
                                </div>
                                <div className='ekseerForm mt-5 text-right'>
                                    <h2 id='bB'>الأمان</h2>
                                    <h4>
                                        جميع المعلومات في شركة السحابة الطبية محمية ومؤمنة بما يتوافق مع المعايير المتطلبة. نحن نستخدم التقنية وسياسات الأمان لحفظ خصوصيتك والتأكد من حماية معلوماتك و لا يتم استخدام أي معلومات شخصية للتسويق الخارجي او لأي جهة خارجية.
                                        تم تصميم التدابير الأمنية لمنع الولوج غير المصرح به وتم قصر الاطلاع على معلوماتك الشخصية على الموظفين الذين يحتاج عملهم إلى معرفة تلك المعلومات ويخضعون لواجب السرية.
                                    </h4>
                                </div>
                                <div className='ekseerForm mt-5 mb-5 text-right'>
                                    <h2 id='bB' dir='rtl'>
                                        2. حقوق المستخدمين
                                    </h2>
                                    <h4>
                                    انت تتحكم بخصوصيتك. تم تصميم شركة السحابة الطبية للحفاظ على معلوماتك آمنه وسرية. بإمكانك إضافة، حذف أو تعديل أي من معلوماتك الصحية في ملفك الشخصي في أي وقت. يحق لك كذلك معرفة ماهية المعلومات الشخصية التي نجمعها وكيف يتم استخدامها. نحن نمارس الشفافية ونبين ماهية المعلومات المستخدمة في سياسة الخصوصية
                                    </h4>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Container >
        </>
    )
}