import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Minesweeper', async () => {
  render(<App />);

  const countdownTimerView = document.querySelector('td.countdown-timer').querySelector('div.display');
  expect(countdownTimerView).toBeInTheDocument();
  
  const timerInitialValue = countdownTimerView.textContent;

  const appView = document.querySelector('div.App');
  expect(appView).toBeInTheDocument();

  const boardView = document.querySelector('div.Board');
  expect(boardView).toBeInTheDocument();

  const boardHeaderView = document.querySelector('div.Board-Header');
  expect(boardHeaderView).toBeInTheDocument();

  const boardBodyView = document.querySelector('div.Board-Body');
  expect(boardBodyView).toBeInTheDocument();

  await new Promise((r) => setTimeout(r, 1000));

  const timerCurrentValue = countdownTimerView.textContent;
  expect(parseInt(timerInitialValue)).toBeGreaterThan(parseInt(timerCurrentValue));
});