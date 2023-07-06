import React, { useState, useEffect } from 'react';
import data from '../data.json';
import './HomePage.css';

interface Company {
  id: number;
  name: string;
  responsibility: string;
}

interface Employee {
  id: number;
  name: string;
  responsibility: string;
  companyId: number;
}

const HomePage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // Carrega os dados do arquivo JSON
    setCompanies(data.companies);
    setEmployees(data.employees);
  }, []);

  const handleResponsibilityChange = (
    companyId: number,
    responsibility: string
  ) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId ? { ...company, responsibility } : company
      )
    );
  };

  const handleEmployeeResponsibilityChange = (
    employeeId: number,
    companyId: number
  ) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId ? { ...employee, companyId } : employee
      )
    );
  };

  const handleAdminResponsibilityChange = (
    companyId: number,
    responsibility: string
  ) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId ? { ...company, responsibility } : company
      )
    );
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.companyId === companyId
          ? { ...employee, responsibility }
          : employee
      )
    );
  };

  return (
    <div>
      <h2>Lista de Empresas</h2>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <strong>{company.name}</strong> - {company.responsibility}
            <select
              value={company.responsibility}
              onChange={(e) =>
                handleResponsibilityChange(company.id, e.target.value)
              }
            >
              {employees.map((employee) => (
                <option key={employee.id} value={employee.name}>
                  {employee.name}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>

      <h2>Lista de Funcionários</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <strong>{employee.name}</strong> - {employee.responsibility}
            <select
              value={employee.companyId}
              onChange={(e) =>
                handleEmployeeResponsibilityChange(
                  employee.id,
                  parseInt(e.target.value)
                )
              }
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
