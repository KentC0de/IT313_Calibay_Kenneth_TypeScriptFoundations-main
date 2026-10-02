# IT313 TypeScript Foundations

This project is my TypeScript version of the Enrollment Eligibility Checker from Lab 2.

The program checks the grades of each student, calculates their average, and determines if they are PASSING or PROBATION.

## What I Used

In this project, I used some basic TypeScript features such as:

- Interfaces
- Enum
- Union types
- Optional properties
- Generics
- Promises
- Async/await
- Try/catch
- map()
- reduce()
- Template literals

I also separated the grade calculation and status checking into a separate `gradeUtils.ts` file.

## How the Program Works

A student is considered **PASSING** if their average grade is 75 or higher.

If the average is below 75, the student is placed on **PROBATION** and receives a "Needs consultation" remark.

The program also calculates the overall class average and counts how many students are passing.

## How to Run

First, install the project dependencies:

```bash
npm install
```
