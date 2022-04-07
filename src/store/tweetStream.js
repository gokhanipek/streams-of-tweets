import { interval, merge, timer } from "rxjs";
import { map, takeUntil } from "rxjs/operators";

const timer$ = timer(30000); 

const createTweetSource = (frequency, account, attribute) => {
    return interval(frequency).pipe(map(i => ({
    account,
    timestamp: Date.now(),
    content: `${attribute} Tweet number ${i + 1}`
    })), takeUntil(timer$));
}

export const tweets$ = merge(
    createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
    createTweetSource(3000, 'iamdevloper', 'Expert'),
    createTweetSource(5000, 'CommitStrip', 'Funny')
    );