import { App } from "vue";
import NumberDance from "./index.vue";

NumberDance.name = "NumberDance";

NumberDance.install = (app: App) => {
	app.component(NumberDance.name, NumberDance);
};

export default NumberDance;
