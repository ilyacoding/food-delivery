package server.view;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.servlet.view.document.AbstractXlsxView;
import server.entity.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

public class XlsxView extends AbstractXlsxView {

    @Override
    protected void buildExcelDocument(Map<String, Object> model,
                                      Workbook workbook,
                                      HttpServletRequest request,
                                      HttpServletResponse response) throws Exception {

        response.setHeader("Content-Disposition", "attachment; filename=\"file.xlsx\"");

        String documentType = (String) model.get("documentType");

        if (documentType == "users") {
            List<User> users = (List<User>) model.get(documentType);

            Sheet sheet = workbook.createSheet("User Details");
            sheet.setDefaultColumnWidth(30);

            CellStyle style = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setFontName("Arial");
            style.setFillForegroundColor(HSSFColor.BLUE.index);
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            font.setBold(true);
            font.setColor(HSSFColor.WHITE.index);
            style.setFont(font);

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Id");
            header.getCell(0).setCellStyle(style);
            header.createCell(1).setCellValue("FirstName");
            header.getCell(1).setCellStyle(style);
            header.createCell(2).setCellValue("LastName");
            header.getCell(2).setCellStyle(style);
            header.createCell(3).setCellValue("Phone Number");
            header.getCell(3).setCellStyle(style);

            int rowCount = 1;

            for (User user : users) {
                Row userRow =  sheet.createRow(rowCount++);
                userRow.createCell(0).setCellValue(String.valueOf(user.getId()));
                userRow.createCell(1).setCellValue(user.getFirstName());
                userRow.createCell(2).setCellValue(user.getLastName());
                userRow.createCell(3).setCellValue(user.getPhoneNumber());
            }
        } else if (documentType == "menus") {
            List<Menu> menus = (List<Menu>) model.get(documentType);

            Sheet sheet = workbook.createSheet("Menu Details");
            sheet.setDefaultColumnWidth(30);

            CellStyle style = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setFontName("Arial");
            style.setFillForegroundColor(HSSFColor.BLUE.index);
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            font.setBold(true);
            font.setColor(HSSFColor.WHITE.index);
            style.setFont(font);

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Id");
            header.getCell(0).setCellStyle(style);
            header.createCell(1).setCellValue("Name");
            header.getCell(1).setCellStyle(style);
            header.createCell(2).setCellValue("Price");
            header.getCell(2).setCellStyle(style);
            header.createCell(3).setCellValue("Description");
            header.getCell(3).setCellStyle(style);

            int rowCount = 1;

            for (Menu menu : menus) {
                Row userRow =  sheet.createRow(rowCount++);
                userRow.createCell(0).setCellValue(String.valueOf(menu.getId()));
                userRow.createCell(1).setCellValue(menu.getName());
                userRow.createCell(2).setCellValue(String.valueOf(menu.getPrice()));
                userRow.createCell(3).setCellValue(menu.getDescription());
            }
        } else if (documentType == "user_orders") {
            List<UserOrder> userOrders = (List<UserOrder>) model.get(documentType);

            Sheet sheet = workbook.createSheet("User Orders Details");
            sheet.setDefaultColumnWidth(30);

            CellStyle style = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setFontName("Arial");
            style.setFillForegroundColor(HSSFColor.BLUE.index);
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            font.setBold(true);
            font.setColor(HSSFColor.WHITE.index);
            style.setFont(font);

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Id");
            header.getCell(0).setCellStyle(style);
            header.createCell(1).setCellValue("Price");
            header.getCell(1).setCellStyle(style);
            header.createCell(2).setCellValue("Deliver Time");
            header.getCell(2).setCellStyle(style);
            header.createCell(3).setCellValue("Address Line 1");
            header.getCell(3).setCellStyle(style);
            header.createCell(4).setCellValue("Address Line 2");
            header.getCell(4).setCellStyle(style);

            int rowCount = 1;

            for (UserOrder userOrder : userOrders) {
                Row userRow =  sheet.createRow(rowCount++);
                userRow.createCell(0).setCellValue(String.valueOf(userOrder.getId()));
                userRow.createCell(1).setCellValue(String.valueOf(userOrder.getPrice()));
                userRow.createCell(2).setCellValue(userOrder.getDeliverTime().toString());
                userRow.createCell(3).setCellValue(userOrder.getAddressLine1());
                userRow.createCell(4).setCellValue(userOrder.getAddressLine2());
            }
        } else if (documentType == "categories") {
            List<Category> categories = (List<Category>) model.get(documentType);

            Sheet sheet = workbook.createSheet("Categories Details");
            sheet.setDefaultColumnWidth(30);

            CellStyle style = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setFontName("Arial");
            style.setFillForegroundColor(HSSFColor.BLUE.index);
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            font.setBold(true);
            font.setColor(HSSFColor.WHITE.index);
            style.setFont(font);

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Id");
            header.getCell(0).setCellStyle(style);
            header.createCell(1).setCellValue("Name");
            header.getCell(1).setCellStyle(style);
            header.createCell(2).setCellValue("Description");
            header.getCell(2).setCellStyle(style);

            int rowCount = 1;

            for (Category category : categories) {
                Row userRow =  sheet.createRow(rowCount++);
                userRow.createCell(0).setCellValue(String.valueOf(category.getId()));
                userRow.createCell(1).setCellValue(category.getName());
                userRow.createCell(2).setCellValue(category.getDescription());
            }
        } else if (documentType == "duration_time") {
            List<DurationTime> durationTimes = (List<DurationTime>) model.get(documentType);

            Sheet sheet = workbook.createSheet("Categories Details");
            sheet.setDefaultColumnWidth(30);

            CellStyle style = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setFontName("Arial");
            style.setFillForegroundColor(HSSFColor.BLUE.index);
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            font.setBold(true);
            font.setColor(HSSFColor.WHITE.index);
            style.setFont(font);

            Row header = sheet.createRow(0);
            header.createCell(0).setCellValue("Id");
            header.getCell(0).setCellStyle(style);
            header.createCell(1).setCellValue("Days Amount");
            header.getCell(1).setCellStyle(style);
            header.createCell(2).setCellValue("Discount Coefficient");
            header.getCell(2).setCellStyle(style);

            int rowCount = 1;

            for (DurationTime durationTime : durationTimes) {
                Row userRow =  sheet.createRow(rowCount++);
                userRow.createCell(0).setCellValue(String.valueOf(durationTime.getId()));
                userRow.createCell(1).setCellValue(String.valueOf(durationTime.getDaysAmount()));
                userRow.createCell(2).setCellValue(String.valueOf(durationTime.getDiscountCoefficient()));
            }
        }
    }
}
