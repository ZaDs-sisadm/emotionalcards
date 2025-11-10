import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setSettings } from "../../store/settingsSlice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
    level: "easy" | "medium" | "hard";
    speed: "slow" | "normal" | "fast";
    sound: boolean;
};

const schema = yup.object({
    level: yup.string().oneOf(["easy", "medium", "hard"]).required(),
    speed: yup.string().oneOf(["slow", "normal", "fast"]).required(),
    sound: yup.boolean().required(),
});

const SettingsForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector((s) => s.settings);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: settings,
    });

    const onSubmit = (data: FormValues) => {
        dispatch(setSettings(data));
        reset(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block font-medium mb-1">Рівень складності</label>
                <div className="flex gap-4">
                    <label><input type="radio" value="easy" {...register("level")} /> Легкий</label>
                    <label><input type="radio" value="medium" {...register("level")} /> Середній</label>
                    <label><input type="radio" value="hard" {...register("level")} /> Важкий</label>
                </div>
                {errors.level && <p className="text-red-500 text-sm">Виберіть рівень</p>}
            </div>

            <div>
                <label className="block font-medium mb-1">Швидкість</label>
                <select {...register("speed")} className="border rounded p-2">
                    <option value="slow">Повільно</option>
                    <option value="normal">Нормально</option>
                    <option value="fast">Швидко</option>
                </select>
            </div>

            <div>
                <label className="flex items-center gap-2">
                    <input type="checkbox" {...register("sound")} />
                    Увімкнути звук
                </label>
            </div>

            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={!isDirty}>
                Зберегти
            </button>
        </form>
    );
};

export default SettingsForm;
