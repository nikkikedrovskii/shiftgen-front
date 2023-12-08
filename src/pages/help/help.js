import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import qinshiftLogo from "../../img/qinshift_logo.svg";
import {Link, useNavigate} from "react-router-dom";

function Help() {

    let navigate = useNavigate();

    const helpButton = () => {
        navigate("/example")
    }

    return (
        <main>
            <div className="container">
                <div className="d-flex align-items-center">
                    <div className="go-back-link">
                        <p className="mb-0"><Link to="/">Back</Link></p>
                    </div>
                    <img src={qinshiftLogo} alt="logo Qinshift" className="ms-auto brand-logo"/>
                </div>

                <form id="podminky">
                    <div className="form-group pt-4">
                        <button type="button" className="btn btn-primary mx-2 custom-button" onClick={helpButton}>Example</button>
                        <div style={{ marginLeft: '1150px' }}>QinGPT v. 1.0.0 </div>
                        <div className="read-rights pt-3 ps-3 pe-3 pb-3" id="outputterms">
                            <div>
                                <h1>ChatGPT is a great tool that can greatly facilitate work and increase productivity. Read on for some tips on how to use ChatGPT properly.</h1>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>Here are some examples of use:</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>•	Generation:</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>1)	Generating test strategies: </h4>
                                <p style={{marginLeft: '30px' }}>ChatGPT can be used as a tool for generating test strategies. <br/>
                                    Simply paste the text into the input field in the format specified in the "example" section and click on the "Generate Test Strategy" button </p>

                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2)	Test Plan Generation:  </h4>
                                <p style={{marginLeft: '30px' }}>ChatGPT can be used as a tool to generate test plan. <br/>
                                    Simply paste text into the input field in the format shown in the "example" section and click on the "Generate Test Plan" button</p>

                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>3)	Test Cases Generation :  </h4>
                                <p style={{marginLeft: '30px' }}>ChatGPT can be used as a tool to generate test cases. <br/>
                                    Simply paste text into the input field in the format shown in the "example" section and click on the "Generate Test Cases" button</p>

                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>4)	Test Plan Generation: </h4>
                                <p style={{marginLeft: '30px' }}>ChatGPT can be used as a tool to generate test strategies. <br/>
                                    Simply paste text into the input field in the format shown in the "example" section and click on the "Generate Test Plan" button</p>

                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>5)	Cucumber Script Generation: </h4>
                                <p style={{marginLeft: '30px' }}>ChatGPT can be used as a tool to generate cucumber script. <br/>
                                    Simply paste the test cases into the input field in the format obtained when generating test cases(point 3) and click on the "Generate Cucumber Script" button.</p>

                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>•	Chat:</h4>
                                <p style={{marginLeft: '30px' }}>	Using chat to communicate with the bot, by opening the "Chat" window.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>1)	Chat can be used to work with emails:  </h4>
                                <p style={{marginLeft: '30px' }}>Understanding an email, summarizing an email thread, preparing a reply to an email. ChatGPT can be used to work more efficiently with emails. You can paste the content of an email thread directly into the application and attach your message with a request for a reply. In this message it is important to include the information that the reply should contain.</p>


                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2)	Chat can be used for quick translation of texts:  </h4>
                                <p style={{marginLeft: '30px' }}>From English, German and other languages. The text you want to translate must be accompanied by a text input, e.g. ,,translate into English:"</p>


                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>3)	Chat can be used to prepare parts of the code:  </h4>
                                <p style={{marginLeft: '30px' }}>Describe to the model what code/script you want to create and with what structure and you can copy the finished script from the prepared frame. If you want to make modifications to the script, you can ask ChatGPT in the next messages.</p>

                                <h2>Using ChatGPT at work can be very effective, but it is important to be cautious and consider its limitations. Keep in mind that ChatGPT is an AI model and may not always provide 100% accurate answers. It is a good idea to use it as a support tool and always verify the information it provides.</h2>


                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>Some tips on how to use ChatGPT correctly:</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>•	Be clear about your query: If you want to get an accurate answer, it is important to clearly state your question. Specify the keywords and information required to get the most relevant answer.</h4>
                                <p style={{marginLeft: '30px' }}>TIP: Instead of asking "What book should I read to learn English better?" <br/>
                                    you could ask the question "As an English teacher, what tasks would you recommend for primary school students to learn English better?"</p>

                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>•	Experiment with different wording: if the first answer is not precise enough, try changing the wording of the question. Sometimes you just need to change the phrasing or add more context to get better results.</h4>
                                <p style={{marginLeft: '30px' }}>TIP: Instead of asking "How do I get from Prague to Brno?" you could ask "What is the fastest and cheapest way from Prague to Brno?"</p>

                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>•	Use contextual messages: When entering a query choose from several contextual messages that can improve your accuracy in any of the uses. For example, when working with SQL or English.</h4>
                                <p style={{marginLeft: '30px' }}>TIP: If you want to ask a question about a historical fact, you can include a link to an article that covers the topic or provide the time period in which the event took place.</p>


                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>•	Try different input lengths: ChatGPT works with different input lengths. Sometimes a short query is enough, sometimes a more detailed explanation may be needed. Try experimenting with input length to get optimal answers.</h4>
                                <p style={{marginLeft: '30px' }}>TIP: If you want to ask about a concept, you can try entering just the name of the concept or describe it in more detail. For example, "What is photosynthesis?" Or "What is the process by which plants use the sun's energy to produce oxygen and sugar?"</p>


                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>•	Verify the information: although ChatGPT is a powerful tool, it may provide incorrect or inaccurate information. Always verify the answers provided with other sources, especially if the information is important or critical.</h4>
                                <p style={{marginLeft: '30px' }}>TIP: If you have a health question, don't take ChatGPT's answer as medical advice, but consult a professional. For example, "What should I do if I have a headache?" Or "What is the cause and treatment of migraines?"</p>


                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>•	Be patient: although ChatGPT has a lot of data available, it may still have its limits. If you don't get an immediate answer, try rephrasing your question or asking a different question. Be patient and try different approaches to get the results you want.</h4>
                                <p style={{marginLeft: '30px' }}>TIP: If you want to ask a complex question, you can break it down into smaller parts or simplify it. For example, "What is the meaning of life?" Or "What is most important to you in life?"</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Help;
