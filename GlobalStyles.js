import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

import palettes from './themes/palettes';

export const TextStyles = theme =>
  StyleSheet.create({
    listed_header_title: {
      style: { fontFamily: 'Quicksand_700Bold', fontSize: 12 },
      props: {},
    },
    screen_title: { style: { color: theme.colors.text.strong }, props: {} },
    selected: {
      style: {
        color: {
          minWidth: Breakpoints.Laptop,
          value: theme.colors.branding.primary,
        },
      },
      props: {},
    },
  });

export const LinearGradientStyles = theme =>
  StyleSheet.create({
    'Linear Gradient': {
      style: {
        alignContent: 'flex-start',
        borderColor: theme.colors.text.light,
        borderRadius: 10,
        borderWidth: 1,
        flex: 1,
        margin: 5,
        opacity: 1,
      },
      props: {
        color1: palettes.Brand.Surface,
        color3: palettes.Brand.Surface,
      },
    },
    SectionName: {
      style: { borderRadius: 0, borderWidth: 0, padding: 10 },
      props: {
        color3: null,
        color2: theme.colors.branding.primary,
        color1: theme.colors.text.strong,
      },
    },
  });

export const ImageStyles = theme =>
  StyleSheet.create({
    Image: { style: { height: 100, width: 100 }, props: {} },
  });

export const SurfaceStyles = theme =>
  StyleSheet.create({
    Surface: {
      style: {
        alignContent: 'center',
        alignSelf: 'auto',
        backgroundColor: palettes.Brand.Surface,
        borderRadius: 10,
        borderStyle: 'solid',
        margin: 15,
      },
      props: {},
    },
    'Surface 2': { style: {}, props: {} },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Login Text Style': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
    'Text Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const LinkStyles = theme =>
  StyleSheet.create({
    Link: { style: { color: theme.colors.branding.primary }, props: {} },
  });

export const HStackStyles = theme =>
  StyleSheet.create({
    'H Stack': {
      style: { alignItems: 'center', flexDirection: 'row' },
      props: {},
    },
  });

export const BottomSheetStyles = theme =>
  StyleSheet.create({
    'Bottom Sheet': {
      style: {
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
      },
      props: {},
    },
  });

export const VStackStyles = theme =>
  StyleSheet.create({
    'V Stack': { style: { flexDirection: 'column' }, props: {} },
  });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { style: { minHeight: 40 }, props: {} } });

export const SquareStyles = theme =>
  StyleSheet.create({
    Square: {
      style: {
        alignItems: 'center',
        backgroundColor: theme.colors.branding.primary,
        justifyContent: 'center',
      },
      props: {},
    },
  });

export const TabViewItemStyles = theme =>
  StyleSheet.create({ 'Tab View Item': { style: { flex: 1 }, props: {} } });

export const H2Styles = theme =>
  StyleSheet.create({
    H2: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 24,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const ZStackStyles = theme =>
  StyleSheet.create({
    'Z Stack': { style: { flexDirection: 'row' }, props: {} },
  });

export const H3Styles = theme =>
  StyleSheet.create({
    H3: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 18.72,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const H4Styles = theme =>
  StyleSheet.create({
    H4: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 16,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const H5Styles = theme =>
  StyleSheet.create({
    H5: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 13.28,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const ActionSheetItemStyles = theme =>
  StyleSheet.create({
    'Action Sheet Item': { style: { textAlign: 'center' }, props: {} },
  });

export const TableStyles = theme =>
  StyleSheet.create({ Table: { style: { flex: 1 }, props: {} } });

export const TableCellStyles = theme =>
  StyleSheet.create({
    'Table Cell': { style: { flex: 1, flexDirection: 'row' }, props: {} },
  });

export const IconStyles = theme =>
  StyleSheet.create({
    Selected: {
      style: {},
      props: {
        color: theme.colors.branding.primary,
      },
    },
  });

export const CheckboxRowStyles = theme =>
  StyleSheet.create({
    'Checkbox Row': {
      style: { minHeight: 50, paddingLeft: 20, paddingRight: 20 },
      props: {},
    },
  });

export const H6Styles = theme =>
  StyleSheet.create({
    H6: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 10.72,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const WebViewStyles = theme =>
  StyleSheet.create({ 'HTML View': { style: { flex: 1 }, props: {} } });

export const H1Styles = theme =>
  StyleSheet.create({
    H1: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 32,
        fontWeight: 'bold',
      },
      props: {},
    },
  });

export const ScreenContainerStyles = theme =>
  StyleSheet.create({ main: { style: {}, props: {} } });

export const ViewStyles = theme =>
  StyleSheet.create({
    split_options: {
      style: {
        alignItems: 'flex-start',
        flex: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'flex-start',
      },
      props: {},
    },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
    'Header menu': {
      style: {
        backgroundColor: [
          {
            minWidth: Breakpoints.Mobile,
            value: theme.colors.branding.primary,
          },
          { minWidth: Breakpoints.Laptop, value: 'rgba(0, 0, 0, 0)' },
        ],
        borderColor: {
          minWidth: Breakpoints.Laptop,
          value: theme.colors.branding.primary,
        },
        borderRadius: 8,
        borderWidth: { minWidth: Breakpoints.Laptop, value: 1 },
        color: {
          minWidth: Breakpoints.Laptop,
          value: theme.colors.branding.primary,
        },
        fontFamily: [
          { minWidth: Breakpoints.Mobile, value: 'System' },
          { minWidth: Breakpoints.Laptop, value: 'Quicksand_400Regular' },
        ],
        fontWeight: { minWidth: Breakpoints.Mobile, value: '700' },
        textAlign: 'center',
        textTransform: { minWidth: Breakpoints.Laptop, value: 'uppercase' },
      },
      props: {},
    },
  });

export const SliderStyles = theme =>
  StyleSheet.create({
    Slider: { style: { marginLeft: 12, marginRight: 12 }, props: {} },
  });
