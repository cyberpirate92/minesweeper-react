import { render, screen } from '@testing-library/react';
import App from './App';
import DigitalDisplay from './DigitalDisplay/DigitalDisplay';
import Board from './Board/Board';

test('Renders Minesweeper', () => {
  render(<App />);

  const appView = document.querySelector('div.App');
  expect(appView).toBeInTheDocument();

  const boardView = document.querySelector('div.Board');
  expect(boardView).toBeInTheDocument();

  const boardHeaderView = document.querySelector('div.Board-Header');
  expect(boardHeaderView).toBeInTheDocument();

  const boardBodyView = document.querySelector('div.Board-Body');
  expect(boardBodyView).toBeInTheDocument();
});

test('Render seven segment display, single digit', () => {
  render(<DigitalDisplay value={9} />);

  const sevenSegmentDisplays = document.querySelectorAll('div.Display');
  expect(sevenSegmentDisplays.length).toBe(1);
});

test('Render seven segment display, double digit', () => {
  render(<DigitalDisplay value={99} />);

  const sevenSegmentDisplays = document.querySelectorAll('div.Display');
  expect(sevenSegmentDisplays.length).toBe(2);
});

test('Render board', () => {
  const rows = 4;
  const cols = 4;
  render(<Board rows={rows} cols={cols}/>);
  const cells = document.querySelectorAll('td.BoardCell');
  expect(cells.length).toBe(rows * cols);
});