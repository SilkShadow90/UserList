import { Alert, AlertButton, AlertOptions, Vibration } from 'react-native';
import { Strings } from '../resources';

export type AlertParams = {
  title: string;
  message?: string;
  buttons?: AlertButton[];
  options?: AlertOptions;
};

export class AlertService {
  private static nextId = 0;
  private static alertMap: Map<number, AlertParams> = new Map();

  private static get nextID(): number {
    AlertService.nextId = AlertService.nextId + 1;

    return AlertService.nextId;
  }

  private static async showNext(): Promise<void> {
    if (AlertService.alertMap.size) {
      const { title, message, buttons, options } = Array.from(AlertService.alertMap)[0][1];

      Vibration.vibrate();
      Alert.alert(title, message, buttons, options);
    }
  }

  private static getContinueButton(id: number): AlertButton {
    return {
      text: Strings.global.continue,
      onPress: () => {
        if (AlertService.alertMap.has(id)) {
          AlertService.alertMap.delete(id);

          setTimeout(async () => {
            await AlertService.showNext();
          }, 200);
        }
      },
      style: 'cancel',
    };
  }

  public static get isEmptyStack(): boolean {
    return !AlertService.alertMap.size;
  }

  public static async showAlert(params: AlertParams): Promise<void> {
    const isEmpty = AlertService.isEmptyStack;

    const id = AlertService.nextID;
    AlertService.alertMap.set(id, {
      ...params,
      buttons: [...(params?.buttons || []), AlertService.getContinueButton(id)],
    });

    if (isEmpty) {
      await AlertService.showNext();
    }
  }
}
