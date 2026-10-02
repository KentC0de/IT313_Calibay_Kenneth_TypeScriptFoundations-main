import { computeAverage, EnrollmentStatus } from "./gradeUtils";
import getStatus from "./gradeUtils";

//Interfaces

interface Enrollee {
  name: string;
  prelim: number;
  midterm: number;
  final: number;
}

interface EligibilityReport {
  name: string;
  average: number;
  status: EnrollmentStatus;
  remarks?: string;
}

// Starter Data
const enrollees: Enrollee[] = [
  { name: "Ana Cruz", prelim: 85, midterm: 90, final: 88 },
  { name: "Bea Santos", prelim: 70, midterm: 65, final: 60 },
  { name: "Cid Ramos", prelim: 95, midterm: 92, final: 97 },
  { name: "Dex Alonzo", prelim: 60, midterm: 55, final: 50 },
  { name: "Eli Tan", prelim: 78, midterm: 80, final: 76 },
];

// Simulated API
function getEnrollees(): Promise<Enrollee[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(enrollees);
    }, 500);
  });
}

// Generic groupBy Function
function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string,
): Record<string, T[]> {
  return items.reduce((groups: Record<string, T[]>, item: T) => {
    const key = keyFn(item);

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);

    return groups;
  }, {});
}

// Main Async Function
async function generateReport(): Promise<void> {
  try {
    // Union type
    let batchId: string | number = 313;

    // Type narrowing
    if (typeof batchId === "number") {
      console.log(`Processing batch number: ${batchId}`);
    } else {
      console.log(`Processing batch ID: ${batchId}`);
    }

    // Get enrollee records
    const records: Enrollee[] = await getEnrollees();

    // Create Eligibility Checker
    const reports: EligibilityReport[] = records.map(
      (enrollee: Enrollee): EligibilityReport => {
        const average: number = computeAverage(
          enrollee.prelim,
          enrollee.midterm,
          enrollee.final,
        );

        const status: EnrollmentStatus = getStatus(average);

        if (status === EnrollmentStatus.Probation) {
          return {
            name: enrollee.name,
            average,
            status,
            remarks: "Needs consultation",
          };
        }

        return {
          name: enrollee.name,
          average,
          status,
        };
      },
    );

    // Calculate Class Average
    const classAverage: number =
      reports.reduce((total: number, report: EligibilityReport): number => {
        return total + report.average;
      }, 0) / reports.length;

    //   Grouped Reports by Status
    const groupedReports: Record<string, EligibilityReport[]> = groupBy(
      reports,
      (report: EligibilityReport): string => report.status,
    );

    // Count Passing Students
    const passingCount: number =
      groupedReports[EnrollmentStatus.Passing]?.length ?? 0;

    //   Display Final Report
    console.log("");
    console.log("=== IT313 Enrollment Eligibility Report (TypeScript) ===");

    reports.forEach((report: EligibilityReport): void => {
      const remarks: string = report.remarks ? ` - ${report.remarks}` : "";

      console.log(
        `${report.name} - Average: ${report.average.toFixed(2)} - ${report.status}${remarks}`,
      );
    });

    console.log(`Class Average: ${classAverage.toFixed(2)}`);

    console.log(`Passing: ${passingCount} / ${reports.length}`);
  } catch (error: unknown) {
    console.error("Failed to generate enrollment report:", error);
  }
}

// Run the program
generateReport();
