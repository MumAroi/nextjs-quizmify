"use client";
import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { quizCreationSchema } from "@/schemas/forms/quiz";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { BookOpen, CopyCheck } from "lucide-react";
import { Separator } from "./ui/separator";

type QuizInput = z.infer<typeof quizCreationSchema>;

type Props = {};

const QuizCreation = (props: Props) => {
	const form = useForm<QuizInput>({
		resolver: zodResolver(quizCreationSchema),
		defaultValues: {
			topic: "",
			type: "mcq",
			amount: 3,
		},
	});

	const onSubmit = (input: QuizInput) => {
		alert(JSON.stringify(input, null, 2));
	};

	form.watch();

	return (
		<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Quiz Creation</CardTitle>
					<CardDescription>Choose a topic</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="topic"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Topic</FormLabel>
										<FormControl>
											<Input placeholder="Enter a topic" {...field} />
										</FormControl>
										<FormDescription>
											Please enter a topic for your quiz.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="amount"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Number of Questions</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter aa Amount"
												{...field}
												type="number"
												onChange={(e) => {
													form.setValue("amount", parseInt(e.target.value));
												}}
												min={1}
												max={10}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-between">
								<Button
									className="w-1/2 rounded-none rounded-l-lg"
									type="button"
									variant={
										form.getValues("type") === "mcq" ? "default" : "secondary"
									}
									onClick={() => {
										form.setValue("type", "mcq");
									}}
								>
									<CopyCheck className="w-4 h-4 mr-2" /> Multiple Choice
								</Button>
								<Separator orientation="vertical" />
								<Button
									className="w-1/2 rounded-none rounded-r-lg"
									type="button"
									variant={
										form.getValues("type") === "open_ended"
											? "default"
											: "secondary"
									}
									onClick={() => {
										form.setValue("type", "open_ended");
									}}
								>
									<BookOpen className="w-4 h-4 mr-2" /> Open Ended
								</Button>
							</div>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
};

export default QuizCreation;
