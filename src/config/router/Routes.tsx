import {
	Routes as ReactRouterRoutes,
	Route,
	Navigate,
	json,
} from 'react-router-dom';
import { BASE_URL } from '../../app/App';
import { AppLayout } from '../../components/layouts/AppLayout';
import { AuthLayout } from '../../components/layouts/AuthLayout';
import { ApplicantModule } from '../../modules/applicant/ApplicantModule';
import { CreateApplicantForm } from '../../modules/applicant/forms/create-applicant/CreateApplicantForm';
import { EmployApplicantForm } from '../../modules/applicant/forms/employ-applicant/EmployApplicantForm';
import { UpdateApplicantForm } from '../../modules/applicant/forms/update-applicant/UpdateApplicantForm';
import { useAuthStore } from '../../modules/auth/Auth.store';
import { Login } from '../../modules/auth/Login/Login';
import { Dashboard } from '../../modules/dashboard/Dashboard';
import { EmployeeModule } from '../../modules/employee/EmployeeModule';
import { CreateEmployeeForm } from '../../modules/employee/forms/create-employee/CreateEmployeeForm';
import { UpdateEmployeeForm } from '../../modules/employee/forms/update-employee/UpdateEmployeeForm';
import { Example } from '../../modules/example/Example';
import { ExampleForm } from '../../modules/example/ExampleForm';
import { ExampleTable } from '../../modules/example/ExampleTable';
import { CreatePositionForm } from '../../modules/position/forms/create-position/CreatePositionForm';
import { UpdatePositionForm } from '../../modules/position/forms/update-position/UpdatePositionForm';
import { PositionModule } from '../../modules/position/PositionModule';
import { ProtectedRoute } from './ProtectedRoute';

export const Routes = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const isLoggedIn = Boolean(accessToken);

	return (
		<ReactRouterRoutes>
			<Route
				path='*'
				element={<Navigate replace to={isLoggedIn ? 'app' : 'auth'} />}
			/>

			<Route path='auth' element={<AuthLayout />}>
				<Route index element={<Login />} />
				<Route path='login' element={<Login />} />
			</Route>

			<Route path='app' element={<ProtectedRoute element={<AppLayout />} />}>
				<Route index element={<Dashboard />} />

				<Route path='applicants' element={<ApplicantModule />} />
				<Route path='applicants/create' element={<CreateApplicantForm />} />
				<Route
					path='applicants/update/:NationalId'
					element={<UpdateApplicantForm />}
				/>
				<Route
					path='applicants/employ/:NationalId'
					element={<EmployApplicantForm />}
				/>

				<Route path='employees' element={<EmployeeModule />} />
				<Route path='employees/create' element={<CreateEmployeeForm />} />
				<Route
					path='employees/update/:NationalId'
					element={<UpdateEmployeeForm />}
				/>

				<Route path='positions' element={<PositionModule />} />
				<Route path='positions/create' element={<CreatePositionForm />} />
				<Route path='positions/update/:Name' element={<UpdatePositionForm />} />

				<Route path='ex' element={<Example />} />
				<Route path='ex-form' element={<ExampleForm />} />
				<Route path='ex-table' element={<ExampleTable />} />
			</Route>
		</ReactRouterRoutes>
	);
};
