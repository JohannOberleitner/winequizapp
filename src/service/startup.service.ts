import { computed, effect, Injectable, signal } from '@angular/core';
import { delayWhen, forkJoin, map, tap, timer } from 'rxjs';

/*
 Taken from: https://medium.com/@codeartz/loading-progress-during-app-initialization-in-angular-5069dc251c67
*/

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  readonly completedInitializer = signal(0);
  readonly totalInitializer = signal(1);

  completedInitializerEffect = effect(() => {
    document.documentElement.style.setProperty(
      '--app-initializer-completed-initializer',
      `${this.completedInitializer()}`
    );
  });

  totalInitializerEffect = effect(() => {
    document.documentElement.style.setProperty(
      '--app-initializer-total-initializer',
      `${this.totalInitializer()}`
    );
  });

  getRandomMs(min = 1000, max = 5000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  mockAsyncTask(name: string) {
    const time = 2000; this.getRandomMs();
    return timer(time).pipe(
      map(() => {
        return { name, time };
      })
    );
  }

  mockAsyncTask2(name: string, time: number) {
    //const time = 2000; this.getRandomMs();
    return timer(time).pipe(
      map(() => {
        return { name, time };
      })
    );
  }

  readonly progressEaseDuration = 600;

  isInitializerCompleted = computed(() => {
    return this.completedInitializer() === this.totalInitializer();
  });

  combineAllAsyncTask() {
    return [
      this.mockAsyncTask2('I am getting application metadata', 750),
      this.mockAsyncTask2('I am getting some assets', 1500)
      /*this.mockAsyncTask('I am getting some 3rd party scripts'),
      this.mockAsyncTask('I setup something'),*/
    ].map((p) => {
      return p.pipe(
        tap(({ name, time }) => {
          this.completedInitializer.update((i) => {
            return i + 1;
          });
          console.warn(`🚀 ~ ${name} :`, time);
        }),
        delayWhen(() => {
          // Prevent flickering by adding a delay to the last initializer.
          return timer(this.isInitializerCompleted() ? this.progressEaseDuration : 0);
        
        })
      );
    });
  }

  initializerFactory() {
    return () => {
      return forkJoin(this.combineAllAsyncTask());
    };
  }
}
