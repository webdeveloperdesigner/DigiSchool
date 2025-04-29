// navigation/AppNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Dashboard/WelcomeScreen';
import RoleSelectionScreen from '../screens/Auth/RoleSelectionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import AdminHomeScreen from '../screens/Dashboard/AdminDashboard';
import StudentHomeScreen from '../screens/Dashboard/StudentDashboard';
import TeacherHomeScreen from '../screens/Dashboard/TeacherDashboard';




// Student Features Screens
// import TimeTableScreen from '../screens';
import StudentAttendanceScreen from '../screens/Dashboard/Students/StudentAttendanceScreen';
// import NotificationsScreen from '../FunctionsScreen/NotificationsScreen';
import HomeworkScreen from '../screens/Dashboard/Students/StudentHomeworkScreen';
import ProfileScreen from '../screens/Dashboard/Students/StudentProfileScreen';
// import FeesScreen from '../FunctionsScreen/FeesScreen';
// import ProgressScreen from '../FunctionsScreen/ProgressScreen';
// import QuizScreen from '../FunctionsScreen/QuizScreen';
// import TeachersScreen from '../FunctionsScreen/TeachersScreen';

// Teacher Features Screens
import TeacherAttendanceScreen from '../screens/Attendance/AttendanceScreen';
import MarkAttendanceScreen from '../screens/Attendance/MarkAttendance';
import TeacherHomeworkScreen from '../screens/Dashboard/Teacher/TeacherHomeworkScreen';
import TeacherClassworkScreen from '../screens/Dashboard/Teacher/TeacherClassworkScreen';
import TeacherProgressScreen from '../screens/Dashboard/Teacher/TeacherProgressScreen';
import TeacherNotificationsScreen from '../screens/Dashboard/Teacher/TeacherNotificationsScreen';
import TeacherStudentsScreen from '../screens/Dashboard/Teacher/TeacherStudentsScreen';
import TeacherTimeTableScreen from '../screens/Dashboard/Teacher/TeacherTimeTableScreen';
import TeacherQuizScreen from '../screens/Dashboard/Teacher/TeacherQuizScreen';
import TeacherNoticesScreen from '../screens/Dashboard/Teacher/TeacherNoticesScreen';
import { profile } from 'console';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
  {/* Welcome & Common Screens */}
  <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
  <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />

  {/* Role-Based Home Screens */}
  <Stack.Screen name="StudentHome" component={StudentHomeScreen} options={{ headerShown: false }} />
  <Stack.Screen name="TeacherHome" component={TeacherHomeScreen} options={{ headerShown: false }} />
  <Stack.Screen name="AdminHome" component={AdminHomeScreen} />

  {/* Student Functionality Screens */}
  
   {/* <Stack.Screen name="TimeTable" component={TimeTableScreen} /> */}
   <Stack.Screen name="StudentAttendance" component={StudentAttendanceScreen} />

  {/* <Stack.Screen name="Notifications" component={NotificationsScreen} />  */}
  <Stack.Screen name="Home" component={StudentHomeScreen} />
  <Stack.Screen name="StudentHomework" component={HomeworkScreen} />
  <Stack.Screen name="StudentProfile" component={ProfileScreen} />
  {/* <Stack.Screen name="Fees" component={FeesScreen} />
  <Stack.Screen name="Progress" component={ProgressScreen} />
  <Stack.Screen name="Quiz" component={QuizScreen} />
  <Stack.Screen name="Teachers" component={TeachersScreen} /> */}
 

  {/* Teacher Functionality Screens */}
  <Stack.Screen name="TeacherAttendance" component={TeacherAttendanceScreen} />
  <Stack.Screen name="MarkAttendance" component={MarkAttendanceScreen} />
  <Stack.Screen name="TeacherHomework" component={TeacherHomeworkScreen} />
  <Stack.Screen name="TeacherClasswork" component={TeacherClassworkScreen} />
  <Stack.Screen name="TeacherProgress" component={TeacherProgressScreen} />
  <Stack.Screen name="TeacherNotifications" component={TeacherNotificationsScreen} />
  <Stack.Screen name="TeacherStudents" component={TeacherStudentsScreen} />
  <Stack.Screen name="TeacherTimeTable" component={TeacherTimeTableScreen} />
  <Stack.Screen name="TeacherQuiz" component={TeacherQuizScreen} />
  <Stack.Screen name="TeacherNotices" component={TeacherNoticesScreen} />


   
</Stack.Navigator>

  );
}