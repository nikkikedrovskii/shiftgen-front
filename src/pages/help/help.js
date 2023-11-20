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
                                <h1> Requirement Analysis Document for Qinshift App with Sensitive Data Guarding v0.2</h1>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>1. Introduction</h4>
                                <p>The Qinshift App is a sophisticated tool designed to streamline the process of creating and managing software testing assets. Built with the capability to interact with Chat GPT 4.0 via an API, this application serves as a valuable resource for test analysts, developers, and quality assurance professionals. The Qinshift App empowers users to efficiently create test analysis, test strategy, and test cases based on requirement analysis or use case descriptions. This document outlines the functional and non-functional requirements of the Qinshift App, with a specific focus on sensitive data guarding, token management, and Chat GPT API integration.</p>

                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>2. Functional Requirements</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.1 Test Asset Creation</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.1.1 Test Analysis</h4>
                                <p style={{marginLeft: '30px' }}> - Objective: Allow users to create comprehensive test analysis documents. <br />
                                    - Requirements: <br />
                                    1. Users should be able to input and edit test analysis content. <br />
                                    2. Provide a formatting and rich text editor for content creation. <br />
                                    3. Support saving and versioning of test analysis documents. </p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.1.2 Test Strategy</h4>
                                <p style={{marginLeft: '30px' }}> - Objective: Enable users to formulate test strategies efficiently. <br />
                                    - Requirements: <br />
                                    1. Provide a dedicated section for defining test strategies. <br />
                                    2. Allow users to specify testing approaches, objectives, and timelines. <br />
                                    3. Support the inclusion of relevant references and documentation. </p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.1.3 Test Cases</h4>
                                <p style={{marginLeft: '30px' }}> - Objective: Allow users to generate test cases based on requirement analysis or use case descriptions. <br />
                                    - Requirements: <br />
                                    1. Users should input or import requirements or use case descriptions. <br />
                                    2. The application should automatically generate test cases based on the provided input. <br />
                                    3. Test cases should be exportable in Python, Playwright, or Cypress format. </p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.2 User Authentication</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.2.1 Gmail Login</h4>
                                <p style={{marginLeft: '30px' }}> - Objective: Provide a secure and convenient login method. <br />
                                    - Requirements: <br />
                                    1. Users should be able to log in using their Gmail accounts. <br />
                                    2. Implement secure authentication protocols.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.3 Data Privacy and Rules Confirmation</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.3.1 Rules Confirmation and Sensitive Data Guarding</h4>
                                <p style={{marginLeft: '30px' }}> - Objective: Ensure compliance with data privacy rules and prevent the input of sensitive data. <br />
                                    - Requirements: <br />
                                    1. Users must confirm their agreement to a set of rules and conditions, including restrictions on sensitive data input. <br />
                                    2. Implement mechanisms to detect and prevent the input of sensitive data, including:
                                    <p style={{marginLeft: '30px'}}>
                                        - Personal Information: Social security numbers, credit card numbers, passwords, addresses. <br />
                                        - Health Information: Diagnoses, treatment plans, medical conditions. <br />
                                        - Racial/Ethnic/Discriminatory Data: Hate speech, discriminatory content, xenophobic material. <br />
                                        - Illegal Activities: Planning crimes, drug trafficking, cyberattacks. <br />
                                        - Intellectual Property: Protect intellectual property rights.</p></p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.4 History and Output Management</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.4.1 History Viewing</h4>
                                <p style={{marginLeft: '30px' }}>- Objective : Allow users to access their historical data and interactions.<br />
                                    - Requirements: <br />
                                    1. Users should have access to a history section displaying past interactions, input, and output data.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.4.2 Output Formats</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Provide flexibility in viewing and exporting output data.<br />
                                    - Requirements: <br />
                                    1. Users should be able to view outputs in XLS or Word document formats.<br/>
                                    2. Export options should include the ability to download outputs in these formats.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.4.3 XLS Output Columns</h4>
                                <p style={{marginLeft: '30px' }}>
                                    - The XLS output should include the following columns: <br/>
                                    <p style={{marginLeft: '40px' }}> - Name <br/>
                                        - Priority <br/>
                                        - Conditions <br/>
                                        - Stage of Execution <br/>
                                        - Result of created test cases </p></p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.5 Data Safety</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.5.1 Data Safety Checks</h4>
                                <p style={{marginLeft: '30px' }}>  Objective : Implement checks to ensure user-provided data is safe.<br />
                                    - Requirements: <br />
                                    1. The application should perform checks to identify and flag any unsafe data provided to the Chat GPT API.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.6 Priority Setting</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.6.1 Test Case Priority</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Allow users to assign priority levels to test cases.<br />
                                    - Requirements: <br />
                                    1. Users should be able to set priorities for test cases, including medium, high, and critical.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.7 User Account Management</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.7.1 Logout</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Allow users to securely log out of their accounts.<br />
                                    - Requirements: <br />
                                    1. Users should have the option to log out securely from their accounts.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.7.2 Account Deletion</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Provide users with the ability to delete their account and associated information.<br />
                                    - Requirements: <br />
                                    1. Users should be able to initiate the account deletion process. <br/>
                                    2. Implement secure and permanent account deletion mechanisms.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.8 Help and Manual</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.8.1 Help and Manual Access</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Offer users easy access to documentation and help resources.<br />
                                    - Requirements: <br />
                                    1. Users should be able to access a comprehensive help and manual section within the application.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>3. Non-Functional Requirements</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>3.1 Responsive Design</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Ensure the Qinshift App is accessible and functional across various devices and screen sizes.<br />
                                    - Requirements: <br />
                                    1. The application must be responsive, adapting to different screen sizes and orientations.<br/>
                                    2. User interfaces should be user-friendly and navigable on both desktop and mobile devices. <br/>
                                    3. Ensure consistent layout and usability regardless of the device being used.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>3.2 Cloud Hosting</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>3.2.1 AWS Cloud Hosting</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Ensure reliable and scalable cloud hosting for the Qinshift App.<br />
                                    - Requirements: <br />
                                    1. The application should be hosted on the AWS cloud platform.<br/>
                                    2. Utilize AWS services for scalability, load balancing, and data storage.<br/>
                                    3. Implement security best practices for AWS cloud hosting.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>3.3 Performance</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>3.3.1 Speed and Responsiveness</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Ensure the Qinshift App performs efficiently and responds promptly to user actions.<br />
                                    - Requirements: <br />
                                    1. The application should have fast load times for all components and features.<br/>
                                    2. Response times to user interactions, such as generating test cases, should be near-instantaneous.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>3.4 Security</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>3.4.1 Data Security</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Protect user data and sensitive information from unauthorized access or breaches.<br />
                                    - Requirements: <br />
                                    1. Implement encryption protocols to secure data transmission.<br/>
                                    2. Store user data securely, following industry best practices.<br/>
                                    3. Regularly perform security audits and vulnerability assessments.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>3.4.2 Token Management</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Manage tokens efficiently to optimize interactions with Chat GPT 4.0 API.<br />
                                    - Requirements: <br />
                                    1. Implement token management to keep track of the number of tokens used in API interactions.<br/>
                                    2. Display a warning to users when they approach token limits to prevent API errors.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>3.4.3 Example of Tokens</h4>
                                <p style={{marginLeft: '30px' }}>- Provide users with an example of what constitutes a token to enhance understanding.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>3.5 Availability and Reliability</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>3.5.1 High Availability</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Ensure the Qinshift App is accessible at all times.<br />
                                    - Requirements: <br />
                                    1. Implement redundancy and failover mechanisms to minimize downtime.<br/>
                                    2. Aim for a high availability rate, ideally 99.9% or higher.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>3.6 Scalability</h4>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>3.6.1 Scalability</h4>
                                <p style={{marginLeft: '30px' }}>-  Objective : Prepare the application for future growth and increased user demand.<br />
                                    - Requirements: <br />
                                    1. Design the application to be horizontally scalable to accommodate additional users and data.<br/>
                                    2. Utilize cloud resources efficiently to scale resources up or down based on demand.</p>
                                <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>4. Conclusion</h4>
                                <p>The Qinshift App aims to provide a user-friendly and efficient solution for creating and managing software testing assets using Chat GPT 4.0-based interactions. By incorporating sensitive data guarding mechanisms, responsive design principles, and leveraging AWS cloud hosting, the application ensures accessibility, security, scalability, and reliability. Meeting these requirements will result in a robust and secure platform, offering a powerful tool for test analysts and quality assurance professionals, while prioritizing data security, user experience, performance, and compliance with sensitive data handling regulations.</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Help;
