export interface Program {
  lab: 'pc' | 'iot';
  number: number;
  title: string;
  description: string;
  language: string;
  code: string;
  commands: string[];
  output: string;
}

export const programs: Program[] = [
  // PC Lab Programs — #01 and #02 are the VTU OpenMP experiments; #03-#11 are the core C exercises.
  {
    lab: 'pc',
    number: 1,
    title: 'OpenMP Program: Sequential vs Parallel Mergesort',
    description: 'Write an OpenMP program to sort an array of n elements using both sequential and parallel mergesort (using sections). Record the difference in execution time.',
    language: 'c',
    code: `#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

void merge(int arr[], int l, int m, int r) {
    int i = l, j = m + 1, k = 0;
    int temp[r - l + 1];

    while (i <= m && j <= r) {
        if (arr[i] <= arr[j])
            temp[k++] = arr[i++];
        else
            temp[k++] = arr[j++];
    }
    while (i <= m) temp[k++] = arr[i++];
    while (j <= r) temp[k++] = arr[j++];

    for (i = l, k = 0; i <= r; i++, k++)
        arr[i] = temp[k];
}

void sequentialMergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        sequentialMergeSort(arr, l, m);
        sequentialMergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

void parallelMergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;

        #pragma omp parallel sections
        {
            #pragma omp section
            parallelMergeSort(arr, l, m);

            #pragma omp section
            parallelMergeSort(arr, m + 1, r);
        }

        merge(arr, l, m, r);
    }
}

int main() {
    int n = 100000;
    int arr1[n], arr2[n];

    for (int i = 0; i < n; i++) {
        arr1[i] = rand() % 1000;
        arr2[i] = arr1[i];
    }

    double start, end;

    start = omp_get_wtime();
    sequentialMergeSort(arr1, 0, n - 1);
    end = omp_get_wtime();
    printf("Sequential Merge Sort Time: %f seconds\\n", end - start);

    start = omp_get_wtime();
    parallelMergeSort(arr2, 0, n - 1);
    end = omp_get_wtime();
    printf("Parallel Merge Sort Time: %f seconds\\n", end - start);

    return 0;
}`,
    commands: [
      'Create: gedit prg1.c',
      'Compile: gcc -fopenmp prg1.c -o prg1',
      'Run: export OMP_NUM_THREADS=4 && ./prg1',
    ],
    output: 'Sequential Merge Sort Time: 0.012787 seconds\nParallel Merge Sort Time: 0.035695 seconds',
  },
  {
    lab: 'pc',
    number: 2,
    title: 'OpenMP Program: Static Schedule (chunk = 2)',
    description: `Write an OpenMP program that divides the Iterations into chunks containing 2 iterations, respectively (OMP_SCHEDULE=static,2). Its input should be the number of iterations, and its output should be which iterations of a parallelized for loop are executed by which thread. For example, if there are two threads and four iterations, the output might be the following:
a. Thread 0 : Iterations 0 −− 1
b. Thread 1 : Iterations 2 −− 3
`,
    language: 'c',
    code: `#include <stdio.h>
#include <omp.h>

int main() {
    int n;
    printf("Enter number of iterations: ");
    scanf("%d", &n);

    int thread_start[100], thread_end[100];
    int i;

    for (i = 0; i < 100; i++) {
        thread_start[i] = -1;
        thread_end[i] = -1;
    }

    #pragma omp parallel for schedule(static,2)
    for (i = 0; i < n; i++) {
        int tid = omp_get_thread_num();

        if (thread_start[tid] == -1)
            thread_start[tid] = i;
        thread_end[tid] = i;
    }

    for (i = 0; i < 100; i++) {
        if (thread_start[i] != -1) {
            printf("Thread %d : Iterations %d -- %d\\n", i, thread_start[i], thread_end[i]);

        }
    }

    return 0;
}
`,
    commands: [
      'Create: gedit prg2.c',
      'Compile: gcc -fopenmp prg2.c -o prg2',
      'Run: export OMP_NUM_THREADS=4 && ./prg2',
    ],
    output: `Enter number of iterations: 6
Thread 0 : Iterations 0 -- 1
Thread 1 : Iterations 2 -- 3
Thread 2 : Iterations 4 -- 5
`,
  },
  {
    lab: 'pc',
    number: 3,
    title: 'Fibonacci with OpenMP Tasks',
    description: 'Write a OpenMP program to calculate n Fibonacci numbers using tasks.',
    language: 'c',
    code: `#include <stdio.h>
#include <omp.h>

int fib(int n) {
    int x, y;

    if (n < 2)
        return n;

    #pragma omp task shared(x)
    x = fib(n - 1);

    #pragma omp task shared(y)
    y = fib(n - 2);

    #pragma omp taskwait
    return x + y;
}

int main() {
    int n;

    printf("Enter number of Fibonacci terms: ");
    scanf("%d", &n);

    printf("Fibonacci Series:\\n");

    for (int i = 0; i < n; i++) {
        int result;

        #pragma omp parallel
        {
            #pragma omp single
            {
                result = fib(i);
            }
        }

        printf("%d ", result);
    }

    printf("\\n");
    return 0;
}`,
    commands: [
      'Create: gedit prg3.c',
      'Compile: gcc -fopenmp prg3.c -o prg3',
      'Run: export OMP_NUM_THREADS=4 && ./prg3',
    ],
    output: 'Enter number of Fibonacci terms: 10 \nFibonacci Series:\n0 1 1 2 3 5 8 13 21 34 ',
  },
  {
    lab: 'pc',
    number: 4,
    title: 'OpenMP Prime Numbers',
    description: 'Write a OpenMP program to find the prime numbers from 1 to n employing parallel for directive. Record both serial and parallel execution times.',
    language: 'c',
    code: `#include <stdio.h>
#include <math.h>
#include <omp.h>

int is_prime(int num) {
    if (num < 2) return 0;
    for (int i = 2; i <= sqrt(num); i++) {
        if (num % i == 0)
            return 0;
    }
    return 1;
}

int main() {
    int n;
    printf("Enter the value of n: ");
    scanf("%d", &n);

    printf("\\nPrime numbers from 1 to %d:\\n", n);
    for (int i = 1; i <= n; i++) {
        if (is_prime(i))
            printf("%d ", i);
    }
    printf("\\n");

    double start_time, end_time;

    start_time = omp_get_wtime();
    for (int i = 1; i <= n; i++) {
        is_prime(i);
    }
    end_time = omp_get_wtime();
    printf("Serial Time: %f seconds\\n", end_time - start_time);

    start_time = omp_get_wtime();
    #pragma omp parallel for
    for (int i = 1; i <= n; i++) {
        is_prime(i);
    }
    end_time = omp_get_wtime();
    printf("Parallel Time: %f seconds\\n", end_time - start_time);

    return 0;
}`,
    commands: [
      'Create: gedit prg4.c',
      'Compile: gcc -fopenmp prg4.c -o prg4 -lm',
      'Run: export OMP_NUM_THREADS=4 && ./prg4',
    ],
    output: 'Enter the value of n: 200\n\nPrime numbers from 1 to 200:\n2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97 101 103 107 109 113 127 131 137 139 149 151 157 163 167 173 179 181 191 193 197 199 \nSerial Time: 0.000006 seconds\nParallel Time: 0.003401 seconds',
  },
  {
    lab: 'pc',
    number: 5,
    title: 'MPI Send and Receive',
    description: 'Write a MPI Program to demonstration of MPI_Send and MPI_Recv.',
    language: 'c',
    code: `#include <mpi.h>
#include <stdio.h>

int main(int argc, char *argv[]) {
    int rank, size;
    int number;

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    if (size < 2) {
        if (rank == 0)
            printf("Please run with at least 2 processes.\\n");
        MPI_Finalize();
        return 0;
    }

    if (rank == 0) {
        number = 100;
        printf("Process %d sending number %d to process 1\\n", rank, number);
        MPI_Send(&number, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
    } else if (rank == 1) {
        MPI_Recv(&number, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        printf("Process %d received number %d from process 0\\n", rank, number);
    }

    MPI_Finalize();
    return 0;
}`,
    commands: [
      'Create: gedit prg5.c',
      'Compile: mpicc prg5.c -o prg5',
      'Run: mpirun -np 2 ./prg5',
    ],
    output: 'Process 0 sending number 100 to process 1\nProcess 1 received number 100 from process 0',
  },
  {
    lab: 'pc',
    number: 6,
    title: 'MPI Deadlock Demonstration',
    description: 'Write a MPI program to demonstration of deadlock using point to point communication and avoidance of deadlock by altering the call sequence.',
    language: 'c',
    code: `#include <mpi.h>
#include <stdio.h>

// Change this to 1 for deadlock, 2 for deadlock avoidance
#define DEADLOCK_PART 2

int main(int argc, char *argv[]) {
    int rank, size, num = 123;

    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    if (size < 2) {
        if (rank == 0)
            printf("Run with at least 2 processes.\\n");
        MPI_Finalize();
        return 0;
    }

#if DEADLOCK_PART == 1
    // ----------- Part A: Deadlock -----------
    if (rank == 0) {
        printf("Process 0 waiting to receive from Process 1...\\n");
        MPI_Recv(&num, 1, MPI_INT, 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        MPI_Send(&num, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
    } else if (rank == 1) {
        printf("Process 1 waiting to receive from Process 0...\\n");
        MPI_Recv(&num, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        MPI_Send(&num, 1, MPI_INT, 0, 0, MPI_COMM_WORLD);
    }

#elif DEADLOCK_PART == 2
    // ----------- Part B: Deadlock Avoidance -----------
    if (rank == 0) {
        MPI_Send(&num, 1, MPI_INT, 1, 0, MPI_COMM_WORLD);
        MPI_Recv(&num, 1, MPI_INT, 1, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        printf("Process 0 received back number: %d\\n", num);
    } else if (rank == 1) {
        MPI_Recv(&num, 1, MPI_INT, 0, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
        MPI_Send(&num, 1, MPI_INT, 0, 0, MPI_COMM_WORLD);
        printf("Process 1 received and sent back number: %d\\n", num);
    }
#endif

    MPI_Finalize();
    return 0;
}`,
    commands: [
      'Create: gedit prg6.c',
      'Compile: mpicc prg6.c -o prg6',
      'Run: mpirun -np 2 ./prg6',
    ],
    output: 'Process 0 waiting to receive from Process 1...\nProcess 1 waiting to receive from Process 0...',
  },
  {
    lab: 'pc',
    number: 7,
    title: 'MPI Broadcast Operation ',
    description: 'Write a MPI Program to demonstration of Broadcast operation.',
    language: 'c',
    code: `#include <mpi.h>
#include <stdio.h>
int main(int argc, char *argv[]) {
    int rank, size;
    int number;
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    if (rank == 0) {
        number = 50;
        printf("Process %d broadcasting number %d to all other processes.\\n", rank, number);
    }
    MPI_Bcast(&number, 1, MPI_INT, 0, MPI_COMM_WORLD);
    printf("Process %d received number %d\\n", rank, number);
    MPI_Finalize();
    return 0;
}
`,
    commands:
      [
      'Create: gedit prg7.c',
      'Compile: mpicc prg7.c -o prg7',
      'Run: mpirun -np 4 ./prg7',
    ],
    output: 'Process 0 broadcasting number 50 to all other processes.\nProcess 0 received number 50\nProcess 1 received number 50\nProcess 3 received number 50\nProcess 2 received number 50',
  },
  {
    lab: 'pc',
    number: 8,
    title: 'MPI Data Distribution',
    description: 'Write a MPI Program demonstration of MPI_Scatter and MPI_Gather.',
    language: 'c',
    code: `#include <mpi.h>
#include <stdio.h>
int main(int argc, char *argv[]) {
    int rank, size;
    int send_data[100], recv_data, gathered_data[100];
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);
    if (rank == 0) {
        for (int i = 0; i < size; i++) {
            send_data[i] = i * 10;
        }
    }
    MPI_Scatter(send_data, 1, MPI_INT, &recv_data, 1, MPI_INT, 0, MPI_COMM_WORLD);
    recv_data = recv_data + rank;
    MPI_Gather(&recv_data, 1, MPI_INT, gathered_data, 1, MPI_INT, 0, MPI_COMM_WORLD);
    if (rank == 0) {
        printf("Gathered data in root process:\\n");
        for (int i = 0; i < size; i++) {
            printf("gathered_data[%d] = %d\\n", i, gathered_data[i]);
        }
    }
    MPI_Finalize();
    return 0;
}
`,
    commands: [
     
      'Create: gedit prg8.c',
      'Compile: mpicc prg8.c -o prg8',
      'Run: mpirun -np 4 ./prg8',
    ],
    output: 'Gathered data in root process:\ngathered_data[0] = 0\ngathered_data[1] = 11\ngathered_data[2] = 22\gathered_data[3] = 33',
  },
  {
    lab: 'pc',
    number: 9,
    title: 'Strings and String Functions',
    description: 'Manipulate character arrays and use standard string library functions.',
    language: 'c',
    code: ``,
    commands: [
      'Create: gedit prg9.c',
      'Compile: gcc prg9.c -o prg9',
      'Run: ./prg9',
    ],
    output: 'Length: 5\nConcatenated: HelloWorld',
  },
  {
    lab: 'pc',
    number: 10,
    title: 'Structures - Custom Data Types',
    description: 'Define and use structures to group related data of different types.',
    language: 'c',
    code: ``,
    commands: [
      'Create: gedit prg10.c',
      'Compile: gcc prg10.c -o prg10',
      'Run: ./prg10',
    ],
    output: 'All records\nTopper details',
  },
  {
    lab: 'pc',
    number: 11,
    title: 'File Handling - Read/Write',
    description: 'Perform file operations: create, read, write, and append to files.',
    language: 'c',
    code: ``,
    commands: [
      'Create: gedit prg11.c',
      'Compile: gcc prg11.c -o prg11',
      'Run: ./prg11',
    ],
    output: 'File contents displayed',
  },

];

export function getProgramsByLab(lab: 'pc' | 'iot'): Program[] {
  return programs.filter((p) => p.lab === lab).sort((a, b) => a.number - b.number);
}

export function getProgram(lab: 'pc' | 'iot', number: number): Program | undefined {
  return programs.find((p) => p.lab === lab && p.number === number);
}

export function getAllPrograms(): Program[] {
  return [...programs].sort((a, b) => {
    if (a.lab !== b.lab) return a.lab === 'pc' ? -1 : 1;
    return a.number - b.number;
  });
}

// ---------------------------------------------------------------------------
// PC Lab Program 01 — "Basic Programs" collection
// A curated set of beginner C programs shown on the PC Lab #1 detail page.
// These are presentation-only (no editing/auth), reusing the shared CodeViewer.
// ---------------------------------------------------------------------------
export interface BasicProgram {
  id: string;
  title: string;
  code: string;
  output: string;
}

export const compileRunGuide = {
  title: 'How to Compile and Run C Programs',
  commands: ['nano program.c', 'gcc program.c -o program', './program'],
  note: 'Create the C file, compile it with GCC, then run the generated executable.',
};

export const basicPrograms: BasicProgram[] = [
  {
    id: 'basic-hello',
    title: 'Basic Hello World Program',
    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    output: 'Hello, World!',
  },
  {
    id: 'basic-prime',
    title: 'Prime Numbers from 1 to n',
    code: `#include <stdio.h>

int main() {
    int n, i, j, flag;

    printf("Enter n: ");
    scanf("%d", &n);

    for(i = 2; i <= n; i++) {
        flag = 1;

        for(j = 2; j < i; j++) {
            if(i % j == 0) {
                flag = 0;
                break;
            }
        }

        if(flag)
            printf("%d ", i);
    }

    return 0;
}`,
    output: `Enter n: 20
2 3 5 7 11 13 17 19`,
  },
  {
    id: 'basic-fibonacci',
    title: 'Fibonacci Series',
    code: `#include <stdio.h>

int main() {
    int n, a = 0, b = 1, c, i;

    printf("Enter n: ");
    scanf("%d", &n);

    for(i = 1; i <= n; i++) {
        printf("%d ", a);
        c = a + b;
        a = b;
        b = c;
    }

    return 0;
}`,
    output: `Enter n: 7
0 1 1 2 3 5 8`,
  },
];

// ---------------------------------------------------------------------------
// IoT Lab (new reusable structure)
// Only the following fields are used by the IoT Program Detail page:
//   id, experimentNo, title, aim, components, circuitDiagram, setup, code, result
// No program content is generated — fill these in yourself.
// Circuit images live in public/images/iot/ and are referenced from here.
// ---------------------------------------------------------------------------
export interface IoTComponent {
  name: string;
  quantity: string;
  description?: string;
}

export interface IoTProgram {
  id: string;
  experimentNo: number;
  title: string;
  aim: string;
  components: IoTComponent[];
  circuitDiagram: string;
  circuitDiagram2?: string;
  setup: string;
  code?: string;
  result: string;
  codeImage?: string;
}

export const iotPrograms: IoTProgram[] = [
  {
    id: 'iot-01',
    experimentNo: 1,
    title: 'Blink Five LEDs Back-Forth',
    aim: 'Develop a program to blink 5 LEDs back and forth.',
    components: [{ name: 'Arduino Uno', quantity: '1' },
      { name: 'Jumper Cable', quantity: '6' },
      { name: 'Bread Board', quantity: '1' },
      { name: 'LED', quantity: '5' },
      { name: 'Resistance (800 Ω)', quantity: '5' },],
    circuitDiagram: '/images/iot/circuit-01.jpeg',
    setup: ` 
a) Connect the circuit as per circuit diagram.
b) Make sure VCC and Ground pins are connected properly.
c) Open Arduino IDE and select the appropriate Arduino board.
`,
    code: `int LED1 = 5;
int LED2 = 6;
int LED3 = 7;
int LED4 = 8;
int LED5 = 9;
int del = 100;

void setup() {
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);
  pinMode(LED4, OUTPUT);
  pinMode(LED5, OUTPUT);
}

void loop() {
  // LED1 ON
  digitalWrite(LED1, HIGH);
  delay(del);

  // LED1 OFF, LED2 ON
  digitalWrite(LED1, LOW);
  digitalWrite(LED2, HIGH);
  delay(del);

  // LED2 OFF, LED3 ON
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, HIGH);
  delay(del);

  // LED3 OFF, LED4 ON
  digitalWrite(LED3, LOW);
  digitalWrite(LED4, HIGH);
  delay(del);

  // LED4 OFF, LED5 ON
  digitalWrite(LED4, LOW);
  digitalWrite(LED5, HIGH);
  delay(del);

  // LED5 OFF, LED4 ON
  digitalWrite(LED5, LOW);
  digitalWrite(LED4, HIGH);
  delay(del);

  // LED4 OFF, LED3 ON
  digitalWrite(LED4, LOW);
  digitalWrite(LED3, HIGH);
  delay(del);

  // LED3 OFF, LED2 ON
  digitalWrite(LED3, LOW);
  digitalWrite(LED2, HIGH);
  delay(del);

  // LED2 OFF (reset back to LED1 on next loop)
  digitalWrite(LED2, LOW);
}`,
    result: 'Successfully demonstrated blink 5 LEDs.',
  },
  {
    id: 'iot-02',
    experimentNo: 2,
    title: 'Arduino Relay Interfacing',
    aim: 'Develop a program to interface a relay with Arduino board',
    components: [{ name: 'Arduino Uno', quantity: '1' },
      { name: 'Jumper Cable', quantity: '6' },
      { name: 'Bread Board', quantity: '1' },
      { name: 'DC Motor', quantity: '1' },
      { name: 'Relay SPDT', quantity: '1' },
      { name: '9V Battery', quantity: '1' },],
    circuitDiagram: '/images/iot/circuit-02.png',
    circuitDiagram2: '/images/iot/circuit-07.png',
    setup: `a) Connect the circuit as per circuit.
b) Make sure VCC and Ground pins connected properly to avoid any damage to Arduino board.
c) Open Arduino IDE then go to tools and select appropriate Arduino board.
d) Select tool then select the port select the com port to which board is connected.
e) Type sketch (Program) and upload to board`,
    code: `void setup()
{
pinMode(13, OUTPUT);
}

void loop()
{
digitalWrite(2, HIGH);
delay(1000); // Wait for 1000 millisecond(s)
digitalWrite (13, LOW);
delay(1000); // Wait for 1000 millisecond(s)
}
`,
    result: 'Successfully demonstrated interface a relay with Arduino board',
  },
  {
    id: 'iot-03',
    experimentNo: 3,
    title: 'Intrusion Detection System',
    aim: 'Develop a program to deploy an intrusion detection system using Ultrasonic and sound sensors.',
    components: [{ name: 'Arduino Uno', quantity: '1' },
      { name: 'Jumper Cable', quantity: '6' },
      { name: 'Bread Board', quantity: '1' },
      { name: 'LED', quantity: '2' },
      { name: 'Resistance (800 S2)', quantity: '2' },
      { name: 'Ultrasonic Distance Sensor (4-pin)', quantity: '1' },
      { name: 'Piezo', quantity: '1' },],
      circuitDiagram: '/images/iot/circuit-03.png',
      code: `int distance = 0;

long readUltrasonicDistance(int triggerPin, int echoPin)
{
  pinMode(triggerPin, OUTPUT);

  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);

  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  

  pinMode(echoPin, INPUT);

  return pulseIn(echoPin, HIGH);
}

void setup()
{
  Serial.begin(9600);

  pinMode(9, OUTPUT);   // Red LED
  pinMode(10, OUTPUT);   // Green LED
  pinMode(8, OUTPUT);   // Piezo buzzer
}

void loop()
{
  distance = 0.01723 * readUltrasonicDistance(6, 5);

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // Intrusion detection
  if (distance > 0 && distance <= 8)
  {
    digitalWrite(9, HIGH);  // Red LED ON
    digitalWrite(10, LOW);   // Green LED OFF
    tone(8, 1000);          // Alarm ON
  }
  else
  {
    digitalWrite(9, LOW);   // Red LED OFF
    digitalWrite(10, HIGH);  // Green LED ON
    noTone(8);              // Alarm OFF
  }

  delay(100);
}`,
    
    setup: `a) Connect the circuit as per circuit.
b) Make sure VCC and Ground pins connected properly to avoid any damage to Arduino board.
c) Open Arduino IDE then goto tools and select appropriate Arduino board.
d) Select tool then select the port select the com port to which board is connected.
e) Type sketch (Program) and upload to board.`,
    
    result: 'Successfully demonstrated deploy an intrusion detection system using Ultrasonic and sound sensors.',
  },
  {
    id: 'iot-04',
    experimentNo: 4,
    title: 'DC Motor Control',
    aim: 'Develop a program to control a DC motor with Arduino board.',
    components: [],
    circuitDiagram: '/images/iot/circuit-04.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-05',
    experimentNo: 5,
    title: 'Smart Street Light System',
    aim: 'Develop a program to deploy smart street light system using LDR sensor.',
    components: [],
    circuitDiagram: '/images/iot/circuit-05.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-06',
    experimentNo: 6,
    title: 'Dry Wet Waste Classification',
    aim: 'Develop a program to classify dry and wet waste with the Moisture sensor (DHT22).',
    components: [],
    circuitDiagram: '/images/iot/circuit-06.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-07',
    experimentNo: 7,
    title: 'Develop a program to read the pH value of a various substances like milk, lime and water.',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-07.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-08',
    experimentNo: 8,
    title: 'Gas Leakage Detection',
    aim: 'Develop a program to detect the gas leakage in the surrounding environment.',
    components: [{ name: 'Arduino Uno', quantity: '1' },
      { name: 'Jumper Cable', quantity: '6' },
      { name: 'Bread Board', quantity: '1' },
      { name: 'MQ-2 Gas Sensor', quantity: '1' },
      { name: 'Buzzer', quantity: '1' },
      { name: 'LED', quantity: '1' },
      { name: 'Resistance (800 Ω)', quantity: '1' },],
    circuitDiagram: '/images/iot/circuit-08.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-09',
    experimentNo: 9,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-09.png',
    setup: '',
    code: '',
    result: '',
  },
  {
    id: 'iot-10',
    experimentNo: 10,
    title: '',
    aim: '',
    components: [],
    circuitDiagram: '/images/iot/circuit-10.png',
    setup: '',
    code: '',
    result: '',
  },
];

export function getIoTProgram(experimentNo: number): IoTProgram | undefined {
  return iotPrograms.find((p) => p.experimentNo === experimentNo);
}
