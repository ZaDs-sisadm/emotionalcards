import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSettings } from "../../context/SettingsContext";

type FormValues = {
    level: "easy" | "medium" | "hard";
    speed: "slow" | "normal" | "fast";
    sound: boolean;
};

const schema = yup.object({
    level: yup.string().oneOf(["easy","medium","hard"]).required(),
    speed: yup.string().oneOf(["slow","normal","fast"]).required(),
    sound: yup.boolean().required(),
}).required();

const SettingsForm: React.FC = () => {
    const { settings, setSettings } = useSettings();
    const { register, handleSubmit, formState: { errors, isDirty } , reset } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: settings,
    });

    const onSubmit = (data: FormValues) => {
        setSettings(data);
        reset(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
            <div>
                <label>Рівень:</label>
                <div>
                    <label><input type="radio" value="easy" {...register("level")} /> Легкий</label>
                    <label style={{marginLeft:12}}><input type="radio" value="medium" {...register("level")} /> Середній</label>
                    <label style={{marginLeft:12}}><input type="radio" value="hard" {...register("level")} /> Важкий</label>
                </div>
                {errors.level && <div className="error">Виберіть рівень</div>}
            </div>

            <div style={{marginTop:8}}>
                <label>Швидкість (затримка анімації):</label>
                <select {...register("speed")} defaultValue={settings.speed}>
                    <option value="slow">Повільно</option>
                    <option value="normal">Нормально</option>
                    <option value="fast">Швидко</option>
                </select>
                {errors.speed && <div className="error">Виберіть швидкість</div>}
            </div>

            <div style={{marginTop:8}}>
                <label><input type="checkbox" {...register("sound")} defaultChecked={settings.sound} /> Звук</label>
            </div>

            <div style={{marginTop:12}}>
                <button type="submit" className="btn-primary" disabled={!isDirty}>Зберегти</button>
            </div>
        </form>
    );
};

export default SettingsForm;
