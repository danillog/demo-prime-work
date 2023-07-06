import React, { useState, useEffect } from 'react';
import data from '../data.json';

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
    responsibility: string
  ) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === employeeId ? { ...employee, responsibility } : employee
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
            <input
              type="text"
              value={company.responsibility}
              onChange={(e) =>
                handleResponsibilityChange(company.id, e.target.value)
              }
            />
          </li>
        ))}
      </ul>

      <h2>Lista de Funcionários</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            <strong>{employee.name}</strong> - {employee.responsibility}
            <input
              type="text"
              value={employee.responsibility}
              onChange={(e) =>
                handleEmployeeResponsibilityChange(employee.id, e.target.value)
              }
            />
          </li>
        ))}
      </ul>

      <h2>Administrador</h2>
      <div>
        <strong>{companies[0]?.name}</strong> - {companies[0]?.responsibility}
        <input
          type="text"
          value={companies[0]?.responsibility}
          onChange={(e) =>
            handleAdminResponsibilityChange(companies[0]?.id, e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default HomePage;
