import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import qinshiftLogo from "../../img/qinshift_logo.svg";
import {Link} from "react-router-dom";

function Help() {

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
                        <div className="read-rights pt-3 ps-3 pe-3 pb-3" id="outputterms">
                                <div>
                                    <h1>Exampe of Requirement Analysis</h1>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>1. Login</h4>
                                    <p>Access is granted immediately after joining company with exception of 5th contractors.
                                        For login are used domain username and password.
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>2. Dashboard</h4>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.1.	Calendar</h4>
                                    <p style={{marginLeft: '30px' }}>By default is shown record from current day.<br />
                                        User can set day of his choosing and interval of time<br />
                                        It’s possible to copy shown record to another day (4.5 Copy records)<br />
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.2.	Tile with last records</h4>
                                    <p style={{marginLeft: '30px' }}>Shows list of last 10 records. Each record redirects to Time tracking tab (4.3 New record) to view or modify, if it‘s possible, this record.<br/>
                                        Contains button Weekly calendar, which redirects to overview of current week’s calendar (4.1 Weekly calendar).<br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px', marginLeft: '20px'  }}>2.3.	Offer to download application to phone</h4>
                                    <p style={{marginLeft: '30px' }}> Tiles to download application to Android or iOS. Redirecting user to Google Play or App Store.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>2.4.	Menu tiles</h4>
                                    <p style={{marginLeft: '30px' }}>Shows all six menu tiles and redirects to right site.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>3. Logout</h4>
                                    <p>Logout succesfully user from system.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>4. Time tracking</h4>
                                    <p>Recording of employee’s project (work on projects, education) or non-project (vacation, <br/>
                                        sickdays) activities. Employee’s pay is generated from these records. <br/>
                                        Time tracking is still open on first work day of the next month until end of the day, after it’s <br/>
                                        automatically closed and it’s not possible to create new or modify records of previous month.<br/>
                                        Most of funcionality is available for employee rights, for records approval of employees are needed other rights like project manager, or other. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.1.	Weekly calendar</h4>
                                    <p style={{marginLeft: '30px' }}>Shows time records in weekly calendar. <br/>
                                        By default is shown current week with filter for hours and possibility to specify wanted date. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.2.	Time records</h4>
                                    <p style={{marginLeft: '30px' }}>Shows table with filter for each recorded day. Table can show all or limited amount of records. <br/>
                                        Default filter contains personal or all records, possibility to filter records from last days or month, and search. <br/>
                                        There's option to set own filter in time interval for specific employee, project, project phase and activity. <br/>

                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.3.	New record</h4>
                                    <p style={{marginLeft: '30px' }}>Contains table with informations about employee's day and calendar. <br/>
                                        Employees set time interval with description of activity for their current project and its phase and can mark interval as overtime. <br/>
                                        They can modify or delete created record. <br/>
                                        Records for each interval fill calendar which defaultly shows current day, with filter about daytime and possibility to change date. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.4.	Weekly records</h4>
                                    <p style={{marginLeft: '30px' }}>Summary of worked out hours in each day of week.<br/>
                                        By default is shown current week with option to set another week. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.5.	Copy records</h4>
                                    <p style={{marginLeft: '30px' }}>Option to copy all employee's records from one day to chosen interval of days.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.6.	Approval according to the project</h4>
                                    <p style={{marginLeft: '30px' }}>For each project which is under management of user, it’s possible to approve time <br/>
                                        records of all employees assigned to this project. <br/>
                                        User can also reject specific or all records of employees with possibility to write a reason. <br/>
                                        Doing so, there will be warning email sent to each employee, whose report was rejected. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.7.	Approval according to the employee</h4>
                                    <p style={{marginLeft: '30px' }}>Is available for specific right. Allows to approve time records of single employee.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.8.	Report</h4>
                                    <p style={{marginLeft: '30px' }}>View of all employee's records in specific month. <br/>
                                        Contains filter for employee, month and year. <br/>
                                        Report view is possible to download and print. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.9.	Vacation days report</h4>
                                    <p style={{marginLeft: '30px' }}>View of employee's vacation days of the year with information about original, taken <br/>
                                        and current amount of days, and report when vacation days were taken. <br/>
                                        Contains filter for year, employee and fund type. <br/>
                                        Report view is possible to download and print. <br/>

                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.10.	Non project activities report</h4>
                                    <p style={{marginLeft: '30px' }}>Overview of non project activities of the year. Non project activities are for example <br/>
                                        vacation days, sickdays, maternity leave, non paid vacation, wedding etc. <br/>
                                        Contains filter for employee, year and activity type. <br/>
                                        Report view is possible to download and print. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>4.11.	Funds</h4>
                                    <p style={{marginLeft: '30px' }}>Overview of employee's available funds (amount of vacation days, compensatory time off, etc.) of the year. <br/>
                                        Possibility to see usage of each fund type in whole year. Option to change year. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>5. Project management</h4>
                                    <p>Project management is bound for project manager role.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>5.1.  Overview</h4>
                                    <p style={{marginLeft: '30px' }}>List of running, new and completed projects. <br/>
                                        Rights to create, modify or delete project are granted according to hiearchy in company. <br/>
                                        It’s possible to set own filter for project searching and print current list. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>5.2.  New project</h4>
                                    <p style={{marginLeft: '30px' }}>Allows to create new project. <br/>
                                        It’s mandatory to fill name of project, business unit, customer, project type, delivery type, company, vertical, project manager, account manager, deputy project manager, start and end date, branch, place, state. <br/>
                                        It’s possible to copy from other existing projects. New project after assigning employee there will reflect in their time tracking. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>5.3.	Modify project</h4>
                                    <p style={{marginLeft: '30px' }}>Allows to modify existing project and adding employees.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>5.4.	Project membership</h4>
                                    <p style={{marginLeft: '30px' }}>List of projects with assigned employees and their position and start/end date there.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>5.5.	Project teams</h4>
                                    <p style={{marginLeft: '30px' }}>List of all project teams. It’s possible to create new or modify and assign members. <br/>
                                        After assigning member it will reflect in their time tracking. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>5.6.	Project types</h4>
                                    <p style={{marginLeft: '30px' }}>List of all project types with owner of this project type. <br/>
                                        It’s possible to create new or modify. It will reflect in time tracking. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>5.7.	Project import</h4>
                                    <p style={{marginLeft: '30px' }}>Allows to import project from specific Excel template. <br/>
                                        Project will create as new and will reflect in time tracking of each member. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>6.  Requests</h4>
                                    <p>Project management is bound for project manager role.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>6.1.	Requests</h4>
                                    <p style={{marginLeft: '30px' }}>Shows list of requests for vacation days, sickdays, compensatory time offs, non paid vacation days, etc. <br/>
                                        It’s possible to see detailed view or modify records. <br/>
                                        Every record has information about current state, created date and type. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>6.2.	New request</h4>
                                    <p style={{marginLeft: '30px' }}>Creates new request for vacation days, sickdays compensatory time offs, non paid vacation days, etc. <br/>
                                        Users set start and end of vacation, or other leave. They can also set if leave is only half of work day (morning or afternoon). <br/>
                                        It’s mandatory to set approver (emplyee’s superior person). <br/>
                                        Users have option to change state of request, if it’s ready for approval (then it’s sent to superior person) or to modify request. If superior person recieves request, they have option to approve it. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>6.3.	Modify/view request</h4>
                                    <p style={{marginLeft: '30px' }}>Allows user to view or modify created request. <br/>
                                        Shows informations about type of request and it’s current state (not approved, approved). <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>7.  Human resources</h4>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>7.2.1.  Overview</h4>
                                    <p style={{marginLeft: '30px' }}>Shows list of all past and future company’s internal trainings for employees. <br/>
                                        Each training has name, description, available space, available free space, <br/>
                                        beginning and end of training and possibility do delete or open detailed view of specific traning. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>7.2.2.  New training</h4>
                                    <p style={{marginLeft: '30px' }}>Creates new training, possible with HR rights.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>7.2.3.  Modify/view</h4>
                                    <p style={{marginLeft: '30px' }}>Contains information of specific training editable for users with HR rights, <br/>
                                        list of candidates attending, possibility to add candidate and more information to which project it belongs. <br/>
                                        Users can apply to join training or add training to their calendar. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>8.  Reports</h4>
                                    <p> Opens SQL Server Reporting Services. View of all employee's records, vacation days and leaves reports for specific month in links. <br/>
                                        View can be in tiles or as list. Contains filter for employee, month and year. Report view is possible to download and print. <br/>
                                        Every document is possible to add to favourites for better searching <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>9.  Administration</h4>
                                    <p> Opens SQL Server Reporting Services. View of all employee's records, vacation days and leaves reports for specific month in links. <br/>
                                        View can be in tiles or as list. Contains filter for employee, month and year. Report view is possible to download and print. <br/>
                                        Every document is possible to add to favourites for better searching <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.1.	Contacts</h4>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.1.1. Overview</h4>
                                    <p style={{marginLeft: '30px' }}>Information about employee, company they works in and their superior</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.1.2. New contact</h4>
                                    <p style={{marginLeft: '30px' }}>Creates new contact with all information about employee. <br/>
                                        To do so, there are needed HR rights. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.1.3. Modify</h4>
                                    <p style={{marginLeft: '30px' }}>Allows user to modify or adding new contact informations like <br/>
                                        basic informations (name, title), address, email and phone number. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.2.	Users</h4>
                                    <p style={{marginLeft: '30px' }}>List of each user with their domain name, full name and email. <br/>
                                        It’s possible to see detailed view of user with their rights and groups of rights. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.3.	Groups of users</h4>
                                    <p style={{marginLeft: '30px' }}>List of all groups with specific rights. <br/>
                                        It’s possible to create new, or modify existing. User with specific rights can add rights or assign people to this group. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.4.	Activities</h4>
                                    <p style={{marginLeft: '30px' }}>List of general activities linked to time tracking. <br/>
                                        It’s possible to create new activity or modify or delete existing one. <br/>
                                        List contains name, project activity checkbox, limit of time for this activity, priority. <br/>
                                        Activity can be linked to project types. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.5.	Customers</h4>
                                    <p style={{marginLeft: '30px' }}>List of general activities linked to time tracking. <br/>
                                        It’s possible to create new activity or modify or delete existing one. <br/>
                                        List contains name, project activity checkbox, limit of time for this activity, priority. <br/>
                                        Activity can be linked to project types. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.6. Task planner</h4>
                                    <p style={{marginLeft: '30px' }}>List of announcing emails about warning for customers about time tracker closing, warning for approvers etc. <br/>
                                        For each message is defined date and time when it should be sent. When message is sent, new date for sending is added. <br/>
                                        List contains name, if message is allowed, parameters, sending date. Each message can be modified or deleted. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.7. Branches</h4>
                                    <p style={{marginLeft: '30px' }}>List of announcing emails about warning for customers about time tracker closing, warning for approvers etc. <br/>
                                        For each message is defined date and time when it should be sent. When message is sent, new date for sending is added. <br/>
                                        List contains name, if message is allowed, parameters, sending date. Each message can be modified or deleted. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.7.1. Overview</h4>
                                    <p style={{marginLeft: '30px' }}>Shows all of company branches with their location, description and contact person, <br/>
                                        with possibility to search specific one. There is an option to delete chosen branch. <br/>
                                    </p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.7.2. New branch</h4>
                                    <p style={{marginLeft: '30px' }}>To create new branch, there‘re needed rights for backoffice.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px',marginLeft: '10px'  }}>9.7.3. Modify/view</h4>
                                    <p style={{marginLeft: '30px' }}>Possibility to modify branch informations with backoffice rights.</p>
                                    <h4 style={{ fontFamily: 'Elza, Arial, sans-serif', fontStyle: 'normal', fontWeight: '500', fontSize: '24px', lineHeight: '28px', color: '#D08F74', paddingTop: '10px' }}>10. Bug report</h4>
                                    <p> Redirects user to Requester system for reporting bugs, where is needed to log in with domain username and password.</p>
                                </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Help;
