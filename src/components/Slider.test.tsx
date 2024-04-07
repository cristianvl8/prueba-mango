
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Slider from './Slider';
import { SliderProps } from '../types/Props/SliderProps';

describe('Slider Component', () => {
    describe('Slider Render', () => {
        it('should render correctly with initial values', () => {
            const defaultProps: SliderProps = {
              minRange: 0,
              maxRange: 100,
              defaultValues: [25, 75],
              fixedValues: [],
              isFixed: false,
            };
        
            render(<Slider {...defaultProps} />);
            
            const minLabel = screen.getByText(defaultProps.defaultValues[0].toFixed(2));
            const maxLabel = screen.getByText(defaultProps.defaultValues[1].toFixed(2));
        
            expect(minLabel).toBeInTheDocument();
            expect(maxLabel).toBeInTheDocument();
          });
        
          it('should render correctly with initial fixed values', () => {
            const defaultProps: SliderProps = {
              minRange: 0,
              maxRange: 100,
              defaultValues: [1.99, 70.99],
              fixedValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
              isFixed: true,
            };
        
            render(<Slider {...defaultProps} />);
            
            const minLabel = screen.getByText(defaultProps.defaultValues[0].toFixed(2));
            const maxLabel = screen.getByText(defaultProps.defaultValues[1].toFixed(2));
        
            expect(minLabel).toBeInTheDocument();
            expect(maxLabel).toBeInTheDocument();
          });
      
    });
    describe('Normal Slider - Drag Interaction', () => {
        
        const defaultProps: SliderProps = {
            minRange: 0,
            maxRange: 100,
            defaultValues: [20, 80],
            fixedValues: [],
            isFixed: false,
        };
        
        it('minValue should never be greater than maxValue', async () => {
            render(<Slider {...defaultProps} />);
            
            const minThumb = screen.getByTestId('min-thumb');
            const minValueElement = screen.getByTestId('min-value');
            const startingPoint = minThumb.getBoundingClientRect().left + window.scrollX;
            
            fireEvent.mouseDown(minThumb, { clientX: startingPoint });
            fireEvent.mouseMove(minThumb, { clientX: startingPoint + 100 });
            fireEvent.mouseUp(minThumb);
            
            await waitFor(() => {
                screen.debug();
                expect(Number(minValueElement.textContent)).toBeGreaterThan(defaultProps.defaultValues[0]);
            });
        });
    });

    describe('Fixed Slider - Drag Interaction', () => {
               
        it('left thumb should be in the same position than right thumb when dragging to the right ', async () => {

            const defaultProps: SliderProps = {
                minRange: 0,
                maxRange: 100,
                defaultValues: [20, 90],
                fixedValues: [20, 30, 40, 50, 60, 70, 80, 90],
                isFixed: true,
            };
        
            render(<Slider {...defaultProps} />);
            
            const minThumb = screen.getByTestId('min-thumb');
            const minValue = screen.getByTestId('min-value');
            const maxThumb = screen.getByTestId('max-thumb');
            const maxValue = screen.getByTestId('max-value');

            const startingPoint = minThumb.getBoundingClientRect().left + window.scrollX;
            
            fireEvent.mouseDown(minThumb, { clientX: startingPoint });
            fireEvent.mouseMove(minThumb, { clientX: startingPoint + 100 });
            fireEvent.mouseUp(minThumb);
            
            await waitFor(() => {
                screen.debug();
                expect(Number(minValue.textContent)).toBe(80);
                expect(Number(minValue.textContent)).toBeLessThan(Number(maxValue.textContent));
            });
        });
    });

    describe('Slider Component - Prompt interaction', () => {

        beforeEach(() => {
          window.prompt = jest.fn();
        });
      
        it('should update the min value when click minValue currency and a new valid number is entered', async () => {

            screen.debug();
            const newMinValue = '50.00';
            (window.prompt as jest.Mock).mockReturnValue(newMinValue);
            
            const defaultProps: SliderProps = {
                minRange: 0,
                maxRange: 100,
                defaultValues: [20, 80],
                fixedValues: [],
                isFixed: false,
            };
            
            render(<Slider {...defaultProps} />);
            
            const minValueElement = screen.getByTestId('min-value');
            await fireEvent.click(minValueElement);
            expect(minValueElement.textContent).toBe(newMinValue);
        });
            
        afterEach(() => {
            jest.resetAllMocks();
        });
        
      });
});