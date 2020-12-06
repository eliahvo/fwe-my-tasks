import { act, fireEvent, getByText, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { FetchMock } from 'jest-fetch-mock';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { theme } from '../theme';
import fetchMock from 'jest-fetch-mock';



describe('DashboardPage', () => {
	beforeEach(() => {
		(fetch as FetchMock).resetMocks();
	});
	it('adds an Item after Create', async () => {
		const taskInitialFetchResponse = {
			data: [],
			status: 'ok',
		};


		const taskPostResponse = {
			data: [{
				taskId: 42,
				name: "TestTask",
				description: "Test description",
				createdAt: "2020-12-03T10:26:58.759Z",
				updatedAt: "2020-12-03T10:26:58.759Z",
				labels: [],
				__trackings__: []
			},]
		};

		const taskResponse = {
			data: [{
				taskId: 42,
				name: "TestTask",
				description: "Test description",
				createdAt: "2020-12-03T10:26:58.759Z",
				updatedAt: "2020-12-03T10:26:58.759Z",
				labels: [],
				__trackings__: []
			},]
		};
		
		(fetch as FetchMock)
			.once(JSON.stringify(taskInitialFetchResponse))
			.once(JSON.stringify(taskPostResponse))
			.once(JSON.stringify(taskResponse));
		const { getByLabelText: getByLabelTextContainer, getByTestId, findAllByTestId } = render(
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<DashboardPage />
				</BrowserRouter>
			</ThemeProvider>,
		);

		const createTask = getByTestId('add-task-button');

		await act(async () => {
			fireEvent.click(createTask);
		});
		await waitFor(() => {
			expect(getByTestId('add-task-form')).toBeInTheDocument();
		});
		const taskForm = getByTestId('add-task-form');

		const name = getByLabelTextContainer(/name/i);
		const description = getByLabelTextContainer(/description/i);

		fireEvent.change(name, {
			target: { value: taskResponse.data[0].name },
		});
		fireEvent.change(description, {
			target: { value: taskResponse.data[0].description },
		});

		const submit = getByText(taskForm, /add task/i);
		fireEvent.click(submit);

		await findAllByTestId('task-item');
		expect((await findAllByTestId('task-item')).length).toBe(1);
	});
});
